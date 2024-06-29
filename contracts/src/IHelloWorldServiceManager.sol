// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IHelloWorldServiceManager {
    // EVENTS
    event NewTaskCreated(uint32 indexed taskIndex, Task task);

    event TaskResponded(uint32 indexed taskIndex, Task task, address operator);

    // STRUCTS
    struct Task {
    uint32 taskCreatedBlock;
    uint a;
    uint b;
    }

    // FUNCTIONS
    // NOTE: this function creates new task.
    function createNewTask(
        uint a,
        uint b
    ) external;

    // NOTE: this function is called by operators to respond to a task.
    function respondToTask(
        Task calldata task,
        uint32 referenceTaskIndex,
        uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[1] calldata _pubSignals
    ) external;
}