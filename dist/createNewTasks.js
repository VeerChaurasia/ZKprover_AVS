"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
// Connect to the Ethereum network
const provider = new ethers_1.ethers.providers.JsonRpcProvider(`http://127.0.0.1:8545`);
// Replace with your own private key (ensure this is kept secret in real applications)
const privateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';
const wallet = new ethers_1.ethers.Wallet(privateKey, provider);
// Replace with the address of your smart contract
const contractAddress = '0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB';
// The ABI provided
const contractABI = [
    { "type": "function", "name": "createNewTask", "inputs": [{ "name": "name", "type": "string", "internalType": "string" }], "outputs": [], "stateMutability": "nonpayable" }
];
// Create a contract instance
const contract = new ethers_1.ethers.Contract(contractAddress, contractABI, wallet);
// Function to generate random names
function generateRandomName() {
    const adjectives = ['Quick', 'Lazy', 'Sleepy', 'Noisy', 'Hungry'];
    const nouns = ['Fox', 'Dog', 'Cat', 'Mouse', 'Bear'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomName = `${adjective}${noun}${Math.floor(Math.random() * 1000)}`;
    return randomName;
}
function createNewTask(taskName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Send a transaction to the createNewTask function
            const tx = yield contract.createNewTask(taskName);
            // Wait for the transaction to be mined
            const receipt = yield tx.wait();
            console.log(`Transaction successful with hash: ${receipt.transactionHash}`);
        }
        catch (error) {
            console.error('Error sending transaction:', error);
        }
    });
}
// Function to create a new task with a random name every 15 seconds
function startCreatingTasks() {
    setInterval(() => {
        const randomName = generateRandomName();
        console.log(`Creating new task with name: ${randomName}`);
        createNewTask(randomName);
    }, 15000);
}
// Start the process
startCreatingTasks();
