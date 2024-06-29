// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@eigenlayer/contracts/libraries/BytesLib.sol";
import "@eigenlayer/contracts/core/DelegationManager.sol";
import "@eigenlayer-middleware/src/unaudited/ECDSAServiceManagerBase.sol";
import "@eigenlayer-middleware/src/unaudited/ECDSAStakeRegistry.sol";
import "@openzeppelin-upgrades/contracts/utils/cryptography/ECDSAUpgradeable.sol";
import "@eigenlayer/contracts/permissions/Pausable.sol";
import {IRegistryCoordinator} from "@eigenlayer-middleware/src/interfaces/IRegistryCoordinator.sol";
import "./IHelloWorldServiceManager.sol";
import "./verifier.sol";
/**
 * @title Primary entrypoint for procuring services from HelloWorld.
 * @author Eigen Labs, Inc.
 */
contract HelloWorldServiceManager is 
    ECDSAServiceManagerBase,
    IHelloWorldServiceManager,
    Pausable,
    Groth16Verifier
{
    using BytesLib for bytes;
    using ECDSAUpgradeable for bytes32;

    /* STORAGE */
    // The latest task index
    uint32 public latestTaskNum;

    // mapping of task indices to all tasks hashes
    // when a task is created, task hash is stored here,
    // and responses need to pass the actual task,
    // which is hashed onchain and checked against this mapping
    mapping(uint32 => bytes32) public allTaskHashes;

    // mapping of task indices to hash of abi.encode(taskResponse, taskResponseMetadata)
    mapping(address => mapping(uint32 => bytes)) public allTaskResponses;

    /* MODIFIERS */
    modifier onlyOperator() {
        require(
            ECDSAStakeRegistry(stakeRegistry).operatorRegistered(msg.sender) 
            == 
            true, 
            "Operator must be the caller"
        );
        _;
    }

    constructor(
        address _avsDirectory,
        address _stakeRegistry,
        address _delegationManager
    )
        ECDSAServiceManagerBase(
            _avsDirectory,
            _stakeRegistry,
            address(0), // hello-world doesn't need to deal with payments
            _delegationManager
        )
    {}


    /* FUNCTIONS */
    // NOTE: this function creates new task, assigns it a taskId
    function createNewTask(uint a, uint b) external {
    // create a new task struct
    Task memory newTask;
    // newTask.name = ""; // Temporarily set name to an empty string or a placeholder
    newTask.taskCreatedBlock = uint32(block.number);
    newTask.a = a; // Assuming Task struct has a field for 'a'
    newTask.b = b; // Assuming Task struct has a field for 'b'

    // store hash of task onchain, emit event, and increase taskNum
    allTaskHashes[latestTaskNum] = keccak256(abi.encode(newTask));
    emit NewTaskCreated(latestTaskNum, newTask);
    latestTaskNum = latestTaskNum + 1;
    }


    

    function respondToTask(
        Task calldata task,
        uint32 referenceTaskIndex,
        uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[1] calldata _pubSignals
    ) external onlyOperator {
        require(
            operatorHasMinimumWeight(msg.sender),
            "Operator does not have match the weight requirements"
        );
        // check that the task is valid, hasn't been responsed yet, and is being responded in time
        require(
            keccak256(abi.encode(task)) ==
                allTaskHashes[referenceTaskIndex],
            "supplied task does not match the one recorded in the contract"
        );
        // some logical checks
        require(
            allTaskResponses[msg.sender][referenceTaskIndex].length == 0,
            "Operator has already responded to the task"
        );

        // verifying the proof
        bool proofVerified = verifyProof(_pA, _pB, _pC, _pubSignals);
        require(proofVerified, "Proof verification failed");
        // The message that was signed
        // uint sum = task.a + task.b; 
        // bytes32 messageHash = keccak256(abi.encodePacked(sum));
        // bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();

        // // // Recover the signer address from the signature
        // address signer = ethSignedMessageHash.recover(signature);

        // require(signer == msg.sender, "Message signer is not operator");

        // updating the storage with task responses
        // allTaskResponses[msg.sender][referenceTaskIndex] = signature;

        // emitting event
        emit TaskResponded(referenceTaskIndex, task, msg.sender);
    }

    // HELPER

    function operatorHasMinimumWeight(address operator) public view returns (bool) {
        return ECDSAStakeRegistry(stakeRegistry).getOperatorWeight(operator) >= ECDSAStakeRegistry(stakeRegistry).minimumWeight();
    }
}