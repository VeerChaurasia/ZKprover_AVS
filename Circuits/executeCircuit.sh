#!/bin/bash
cd Circuits



# Command 2: Generate the witness using node
node Adder_js/generate_witness.js Adder_js/Adder.wasm input.json witness.wtns
snarkjs groth16 prove Adder_0001.zkey witness.wtns proof.json public.json
# Command 3: Generate call data using snarkjs
snarkjs generatecall > output.txt