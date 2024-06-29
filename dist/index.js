"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const dotenv = __importStar(require("dotenv"));
const delegationABI_1 = require("./abis/delegationABI");
const contractABI_1 = require("./abis/contractABI");
const registryABI_1 = require("./abis/registryABI");
const avsDirectoryABI_1 = require("./abis/avsDirectoryABI");
const fs_extra_1 = __importDefault(require("fs-extra"));
dotenv.config();
const operatorHelper_1 = require("./operatorHelper");
const generateVerifierInputs_1 = require("./generateVerifierInputs");
const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
const delegationManagerAddress = process.env.DELEGATION_MANAGER_ADDRESS;
const contractAddress = process.env.CONTRACT_ADDRESS;
const stakeRegistryAddress = process.env.STAKE_REGISTRY_ADDRESS;
const avsDirectoryAddress = process.env.AVS_DIRECTORY_ADDRESS;
const delegationManager = new ethers_1.ethers.Contract(delegationManagerAddress, delegationABI_1.delegationABI, wallet);
const contract = new ethers_1.ethers.Contract(contractAddress, contractABI_1.contractABI, wallet);
const registryContract = new ethers_1.ethers.Contract(stakeRegistryAddress, registryABI_1.registryABI, wallet);
const avsDirectory = new ethers_1.ethers.Contract(avsDirectoryAddress, avsDirectoryABI_1.avsDirectoryABI, wallet);
const signAndRespondToTask = (taskIndex, taskCreatedBlock, a, b, _a, _b, _c, _num) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(message);
    // const messageHash = ethers.utils.solidityKeccak256(["uint256"], [message]);
    // const messageBytes = ethers.utils.arrayify(messageHash);
    // const signature = await wallet.signMessage(messageBytes);
    console.log(`Signing and responding to task ${taskIndex}`);
    const tx = yield contract.respondToTask({ taskCreatedBlock: taskCreatedBlock, a: a, b: b }, taskIndex, _a, _b, _c, _num);
    yield tx.wait();
    console.log(`Responded to task`);
});
const registerOperator = () => __awaiter(void 0, void 0, void 0, function* () {
    const tx1 = yield delegationManager.registerAsOperator({
        earningsReceiver: yield wallet.address,
        delegationApprover: "0x0000000000000000000000000000000000000000",
        stakerOptOutWindowBlocks: 0
    }, "");
    yield tx1.wait();
    console.log("Operator registered on EL successfully");
    const salt = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.randomBytes(32));
    const expiry = Math.floor(Date.now() / 1000) + 3600; // Example expiry, 1 hour from now
    // Define the output structure
    let operatorSignature = {
        expiry: expiry,
        salt: salt,
        signature: ""
    };
    // Calculate the digest hash using the avsDirectory's method
    const digestHash = yield avsDirectory.calculateOperatorAVSRegistrationDigestHash(wallet.address, contract.address, salt, expiry);
    // Sign the digest hash with the operator's private key
    const signingKey = new ethers_1.ethers.utils.SigningKey(process.env.PRIVATE_KEY);
    const signature = signingKey.signDigest(digestHash);
    // Encode the signature in the required format
    operatorSignature.signature = ethers_1.ethers.utils.joinSignature(signature);
    const tx2 = yield registryContract.registerOperatorWithSignature(wallet.address, operatorSignature);
    yield tx2.wait();
    console.log("Operator registered on AVS successfully");
});
const monitorNewTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    let a = 13;
    let b = 5;
    // console.log(a+b);
    yield contract.createNewTask(a, b);
    contract.on("NewTaskCreated", (taskIndex, task) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`New task detected: ${+task.a + +task.b}`);
        // Calculate the sum
        let sum = Number(task.a) + Number(task.b);
        console.log(`Sum: ${sum}`);
        //generating proof
        let proof;
        (0, operatorHelper_1.writeInputToFile)(Number(task.a), Number(task.b));
        (0, operatorHelper_1.runScript)();
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        (0, generateVerifierInputs_1.generateVerifierInputs)();
        const verifierInputs = yield fs_extra_1.default.readJson("./Circuits/verifierInputs.json");
        const a = verifierInputs.a.map(ethers_1.ethers.BigNumber.from);
        const b = verifierInputs.b.map((row) => row.map(ethers_1.ethers.BigNumber.from));
        const c = verifierInputs.c.map(ethers_1.ethers.BigNumber.from);
        const input = verifierInputs.input.map(ethers_1.ethers.BigNumber.from);
        yield signAndRespondToTask(taskIndex, Number(task.taskCreatedBlock), Number(task.a), Number(task.b), a, b, c, input);
    }));
    console.log("Monitoring for new tasks...");
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield registerOperator();
    monitorNewTasks().catch((error) => {
        console.error("Error monitoring tasks:", error);
    });
});
main().catch((error) => {
    console.error("Error in main function:", error);
});
