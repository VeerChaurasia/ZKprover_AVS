# ZKprover AVS

## Project Description

ZKprover as an Actively Validated Services(AVS) revolutionizes task verification through a seamless interaction between users and operators. Users initiate tasks, such as mathematical computations or data verification, by submitting requests to the AVS. Operators, registered and staked within the system, then respond by generating zero-knowledge proofs (zkProofs) that validate the task's correctness without revealing sensitive information. These proofs are securely submitted back to the AVS for on-chain validation, ensuring transparency and integrity through blockchain technology.

### Working of Project
![AVS (1)](https://github.com/ABD-AZE/ZK_Prover_AVS/assets/142890355/34f0930e-1b70-4455-a740-1dd35cbe70fc)

### How Operator gets registered 
<img width="899" alt="Screenshot 2024-06-30 at 02 29 40" src="https://github.com/ABD-AZE/ZK_Prover_AVS/assets/142890355/17cd1503-a449-480b-917e-8545f724c870">



## Project Video
https://youtu.be/fT8hu4CCxL0
## Process Overview

1. AVS consumer requests a Task to be generated and signed.
2. AVS emits an event for operators to pick up the request.
3. A staked operator generates the result and signs it.
4. The operator submits the signed result back to the AVS.
5. AVS verifies the operator's registration and stake,zkproof, then accepts the submission.

## Quick Start

### Prerequisites

- npm
- Foundry
- Docker (ensure it's running)
- NodeJS packages:
  - tcs
  - ethers

### Installation

1. Clone the repository: `git clone https://github.com/ABD-AZE/ZK_Prover_AVS.git `
2. Run `npm install`
3. Run `cp .env`
4. Run `make start-chain-with-contracts-deployed`
5. Open new terminal tab and run `make start-operator`

### For Running backend and frontend

1. Run `cd frontend`
2. Run `npm install`
3. Run `npm start`
4. Open new terminal tab and run `cd backend`
5. Run `npm install`
6. Run `ts-node index.ts`

## Challenges Faced
1. ### Understanding the AVS framework.
The building block of our project was AVS so understanding it in depth was truly a necessary as well as a cumbersome task.

2. ### Integration with Smart Contracts
EigenLayer's Repo has a lot of smart contracts. Understanding each of them was necessary to build our project, although we learned a lot but it was quite challenging

3. ### Integration of circuit with operator
First we planned to use a complex circuit but we were facing issues while intergation due to the large input sizes for a more complex circuit. So instead we went ahead with using simpler circuits i.e. The Adder Circuit


## Team Members
- Veer
- Abdullah


## Learning
- Our main aim was to build a ZK prover for a ZK roll up as an AVS. So in the initial phase of our project we also learned about roll up functioning and the problem with the prover being a centralized entity.
- We undestood the architecture of EigenLayer AVS which included understaing its complex smart ocntracts and how they interact with each other
- We used the ethers library a lot during the project, thereby deepening our understanding of its methods.
- Understanding how pre-saved states can be used to start a local anvil chain from that particular state was also really fascinating.
- We also learned a lot about bash scripting along with javascript promises to integrate out circuit with the operator file which was written in js.
  
## Future Plans
- We first and foremost plan to implement a staking and slashing logic so that our AVS can truly demonstrate the working of an Eigen Layer AVS.
- We would also be working on the zero knowledge proofs. Our main aim was to make a ZK prover, so we would continue on that path and increase the complexity of our circuit. Next we are thinking to upgrade to a merkle inclusion proof.
- working on BLSIntegration for our AVS.
