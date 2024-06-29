import fs from "fs-extra";
import { ethers } from "ethers";
export async function generateVerifierInputs(): Promise<void> {
    // Read proof.json and public.json
    const proof = await fs.readJson("./Circuits/proof.json");
    const publicSignals = await fs.readJson("./Circuits/public.json");

    // Extract and format the proof elements
    const formattedProof = {
        a: proof.pi_a.slice(0, 2),
        b: [
            proof.pi_b[0].slice(0, 2),
            proof.pi_b[1].slice(0, 2)
        ],
        c: proof.pi_c.slice(0, 2)
    };

    // Create the final input structure for the verifier contract
    const verifierInputs = {
        a: formattedProof.a.map((x: any) => x.toString()),
        b: formattedProof.b.map((row: any) => row.map((x: any) => x.toString())),
        c: formattedProof.c.map((x: any) => x.toString()),
        input: publicSignals.map((x: any) => x.toString())
    };

    // Write the verifier inputs to a file
    await fs.writeJson('./Circuits/verifierInputs.json', verifierInputs, { spaces: 2 });
    console.log("Verifier inputs generated:", verifierInputs);
}
export async function run(){
    const verifierInputs = await fs.readJson("./Circuits/verifierInputs.json");
        const a = verifierInputs.a.map(ethers.BigNumber.from);
        const b = verifierInputs.b.map((row: any[]) => row.map(ethers.BigNumber.from));
        const c = verifierInputs.c.map(ethers.BigNumber.from);
        const input = verifierInputs.input.map(ethers.BigNumber.from);
        console.log(a,b,c,input);
}