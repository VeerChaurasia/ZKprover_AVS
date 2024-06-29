import fs from 'fs';
import { exec } from 'child_process';

export function writeInputToFile(a:number,b:number) {
    const content = JSON.stringify({ a: String(a), b: String(b) });

    fs.writeFile('./Circuits/input.json', content, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Input file written successfully.');
        }
    });
}
export function runScript() {
    exec('./Circuits/executeCircuit.sh', (error, stdout, stderr) => {
        if (error) {
            console.error('Error running script:', error);
        } else {
            console.log('Proof generated successfully.');
        }
    });
}
export function readOutputFile() {
    fs.readFile('./Circuits/output.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            console.log('Proof:', data);
            return data;
        }
    });
}