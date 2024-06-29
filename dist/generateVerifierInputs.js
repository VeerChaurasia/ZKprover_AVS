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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerifierInputs = generateVerifierInputs;
exports.run = run;
const fs_extra_1 = __importDefault(require("fs-extra"));
const ethers_1 = require("ethers");
function generateVerifierInputs() {
    return __awaiter(this, void 0, void 0, function* () {
        // Read proof.json and public.json
        const proof = yield fs_extra_1.default.readJson("./Circuits/proof.json");
        const publicSignals = yield fs_extra_1.default.readJson("./Circuits/public.json");
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
            a: formattedProof.a.map((x) => x.toString()),
            b: formattedProof.b.map((row) => row.map((x) => x.toString())),
            c: formattedProof.c.map((x) => x.toString()),
            input: publicSignals.map((x) => x.toString())
        };
        // Write the verifier inputs to a file
        yield fs_extra_1.default.writeJson('./Circuits/verifierInputs.json', verifierInputs, { spaces: 2 });
        console.log("Verifier inputs generated:", verifierInputs);
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const verifierInputs = yield fs_extra_1.default.readJson("./Circuits/verifierInputs.json");
        const a = verifierInputs.a.map(ethers_1.ethers.BigNumber.from);
        const b = verifierInputs.b.map((row) => row.map(ethers_1.ethers.BigNumber.from));
        const c = verifierInputs.c.map(ethers_1.ethers.BigNumber.from);
        const input = verifierInputs.input.map(ethers_1.ethers.BigNumber.from);
        console.log(a, b, c, input);
    });
}
