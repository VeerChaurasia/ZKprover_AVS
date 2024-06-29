import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { delegationABI } from "./abis/delegationABI";
import { contractABI } from './abis/contractABI';
import { registryABI } from './abis/registryABI';
import { avsDirectoryABI } from './abis/avsDirectoryABI';
import fs from "fs-extra";

dotenv.config();

import { writeInputToFile, runScript, readOutputFile } from "./operatorHelper";
import { generateVerifierInputs,run } from "./generateVerifierInputs";


const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const delegationManagerAddress = process.env.DELEGATION_MANAGER_ADDRESS!;
const contractAddress = process.env.CONTRACT_ADDRESS!;
const stakeRegistryAddress = process.env.STAKE_REGISTRY_ADDRESS!;
const avsDirectoryAddress = process.env.AVS_DIRECTORY_ADDRESS!;

const delegationManager = new ethers.Contract(delegationManagerAddress, delegationABI, wallet);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
const registryContract = new ethers.Contract(stakeRegistryAddress, registryABI, wallet);
const avsDirectory = new ethers.Contract(avsDirectoryAddress, avsDirectoryABI, wallet);
interface taski{
    a:number;
    b:number;
    taskCreatedBlock:number;
}
const signAndRespondToTask = async (taskIndex: number, taskCreatedBlock: number, a: number, b: number, _a:ethers.BigNumber[],_b:ethers.BigNumber[][],_c:ethers.BigNumber[],_num:ethers.BigNumber[]) => {
    // console.log(message);
    // const messageHash = ethers.utils.solidityKeccak256(["uint256"], [message]);
    // const messageBytes = ethers.utils.arrayify(messageHash);
    // const signature = await wallet.signMessage(messageBytes);
  
    console.log(`Signing and responding to task ${taskIndex}`);
  
    const tx = await contract.respondToTask(
      { taskCreatedBlock: taskCreatedBlock, a: a, b: b },
      taskIndex,
        _a,
        _b,
        _c,
        _num
    );
  
    await tx.wait();
    console.log(`Responded to task`);
  };

const registerOperator = async () => {
    const tx1 = await delegationManager.registerAsOperator({
        earningsReceiver: await wallet.address,
        delegationApprover: "0x0000000000000000000000000000000000000000",
        stakerOptOutWindowBlocks: 0
    }, "");
    await tx1.wait();
    console.log("Operator registered on EL successfully");

    const salt = ethers.utils.hexlify(ethers.utils.randomBytes(32));
    const expiry = Math.floor(Date.now() / 1000) + 3600; // Example expiry, 1 hour from now

    // Define the output structure
    let operatorSignature = {
        expiry: expiry,
        salt: salt,
        signature: ""
    };

    // Calculate the digest hash using the avsDirectory's method
    const digestHash = await avsDirectory.calculateOperatorAVSRegistrationDigestHash(
        wallet.address, 
        contract.address, 
        salt, 
        expiry
    );

    // Sign the digest hash with the operator's private key
    const signingKey = new ethers.utils.SigningKey(process.env.PRIVATE_KEY!);
    const signature = signingKey.signDigest(digestHash);
    
    // Encode the signature in the required format
    operatorSignature.signature = ethers.utils.joinSignature(signature);

    const tx2 = await registryContract.registerOperatorWithSignature(
        wallet.address,
        operatorSignature
    );
    await tx2.wait();
    console.log("Operator registered on AVS successfully");
};

const monitorNewTasks = async () => {
    let a:number = 13;
    let b:number = 5;
    // console.log(a+b);
    await contract.createNewTask(a, b);
    
    contract.on("NewTaskCreated", async (taskIndex: number, task: taski) => {
        console.log(`New task detected: ${+task.a + +task.b}`);
        // Calculate the sum

        let sum:number = Number(task.a) + Number(task.b);
        console.log(`Sum: ${sum}`);

        //generating proof
        let proof:any[];
        writeInputToFile(Number(task.a), Number(task.b));
        runScript();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        generateVerifierInputs();
        const verifierInputs = await fs.readJson("./Circuits/verifierInputs.json");
        const a = verifierInputs.a.map(ethers.BigNumber.from);
        const b = verifierInputs.b.map((row: any[]) => row.map(ethers.BigNumber.from));
        const c = verifierInputs.c.map(ethers.BigNumber.from);
        const input = verifierInputs.input.map(ethers.BigNumber.from);
        await signAndRespondToTask(taskIndex, Number(task.taskCreatedBlock), Number(task.a), Number(task.b), a, b, c, input);
    });

    console.log("Monitoring for new tasks...");
};

const main = async () => {
    await registerOperator();
    monitorNewTasks().catch((error) => {
        console.error("Error monitoring tasks:", error);
    });
};

main().catch((error) => {
    console.error("Error in main function:", error);
});