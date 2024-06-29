"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInputToFile = writeInputToFile;
exports.runScript = runScript;
exports.readOutputFile = readOutputFile;
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
function writeInputToFile(a, b) {
    const content = JSON.stringify({ a: String(a), b: String(b) });
    fs_1.default.writeFile('./Circuits/input.json', content, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        }
        else {
            console.log('Input file written successfully.');
        }
    });
}
function runScript() {
    (0, child_process_1.exec)('./Circuits/executeCircuit.sh', (error, stdout, stderr) => {
        if (error) {
            console.error('Error running script:', error);
        }
        else {
            console.log('Proof generated successfully.');
        }
    });
}
function readOutputFile() {
    fs_1.default.readFile('./Circuits/output.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }
        else {
            console.log('Proof:', data);
            return data;
        }
    });
}
