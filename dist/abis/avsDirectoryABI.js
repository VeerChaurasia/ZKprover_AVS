"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avsDirectoryABI = void 0;
exports.avsDirectoryABI = [
    {
        type: "constructor",
        inputs: [
            {
                name: "_delegation",
                type: "address",
                internalType: "contract IDelegationManager",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "DOMAIN_TYPEHASH",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "OPERATOR_AVS_REGISTRATION_TYPEHASH",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "avsOperatorStatus",
        inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "address", internalType: "address" },
        ],
        outputs: [
            {
                name: "",
                type: "uint8",
                internalType: "enum IAVSDirectory.OperatorAVSRegistrationStatus",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "calculateOperatorAVSRegistrationDigestHash",
        inputs: [
            { name: "operator", type: "address", internalType: "address" },
            { name: "avs", type: "address", internalType: "address" },
            { name: "salt", type: "bytes32", internalType: "bytes32" },
            { name: "expiry", type: "uint256", internalType: "uint256" },
        ],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "cancelSalt",
        inputs: [{ name: "salt", type: "bytes32", internalType: "bytes32" }],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "delegation",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "contract IDelegationManager",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "deregisterOperatorFromAVS",
        inputs: [{ name: "operator", type: "address", internalType: "address" }],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "domainSeparator",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "initialize",
        inputs: [
            { name: "initialOwner", type: "address", internalType: "address" },
            {
                name: "_pauserRegistry",
                type: "address",
                internalType: "contract IPauserRegistry",
            },
            { name: "initialPausedStatus", type: "uint256", internalType: "uint256" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "operatorSaltIsSpent",
        inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "bytes32", internalType: "bytes32" },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "pause",
        inputs: [
            { name: "newPausedStatus", type: "uint256", internalType: "uint256" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "pauseAll",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "paused",
        inputs: [{ name: "index", type: "uint8", internalType: "uint8" }],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "paused",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "pauserRegistry",
        inputs: [],
        outputs: [
            { name: "", type: "address", internalType: "contract IPauserRegistry" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "registerOperatorToAVS",
        inputs: [
            { name: "operator", type: "address", internalType: "address" },
            {
                name: "operatorSignature",
                type: "tuple",
                internalType: "struct ISignatureUtils.SignatureWithSaltAndExpiry",
                components: [
                    { name: "signature", type: "bytes", internalType: "bytes" },
                    { name: "salt", type: "bytes32", internalType: "bytes32" },
                    { name: "expiry", type: "uint256", internalType: "uint256" },
                ],
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "renounceOwnership",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "setPauserRegistry",
        inputs: [
            {
                name: "newPauserRegistry",
                type: "address",
                internalType: "contract IPauserRegistry",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "transferOwnership",
        inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "unpause",
        inputs: [
            { name: "newPausedStatus", type: "uint256", internalType: "uint256" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "updateAVSMetadataURI",
        inputs: [{ name: "metadataURI", type: "string", internalType: "string" }],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "AVSMetadataURIUpdated",
        inputs: [
            { name: "avs", type: "address", indexed: true, internalType: "address" },
            {
                name: "metadataURI",
                type: "string",
                indexed: false,
                internalType: "string",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Initialized",
        inputs: [
            { name: "version", type: "uint8", indexed: false, internalType: "uint8" },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "OperatorAVSRegistrationStatusUpdated",
        inputs: [
            {
                name: "operator",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            { name: "avs", type: "address", indexed: true, internalType: "address" },
            {
                name: "status",
                type: "uint8",
                indexed: false,
                internalType: "enum IAVSDirectory.OperatorAVSRegistrationStatus",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "OwnershipTransferred",
        inputs: [
            {
                name: "previousOwner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "newOwner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Paused",
        inputs: [
            {
                name: "account",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "newPausedStatus",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "PauserRegistrySet",
        inputs: [
            {
                name: "pauserRegistry",
                type: "address",
                indexed: false,
                internalType: "contract IPauserRegistry",
            },
            {
                name: "newPauserRegistry",
                type: "address",
                indexed: false,
                internalType: "contract IPauserRegistry",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Unpaused",
        inputs: [
            {
                name: "account",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "newPausedStatus",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
];
