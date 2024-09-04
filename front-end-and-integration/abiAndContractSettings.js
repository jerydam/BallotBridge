// NFT contract settings
const electionContractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "politicalParty",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "addedTime",
        type: "uint256",
      },
    ],
    name: "CandidateAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
    ],
    name: "CandidateRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "closedTime",
        type: "uint256",
      },
    ],
    name: "ElectionClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "adminName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "coverPhoto",
        type: "string",
      },
    ],
    name: "ElectionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "ElectionEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
    ],
    name: "ElectionStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "adminName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "coverPhoto",
        type: "string",
      },
    ],
    name: "ElectionUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
    ],
    name: "VoterRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "winnerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "winnerName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    name: "WinnerAnnounced",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "candidateName",
        type: "string",
      },
      {
        internalType: "string",
        name: "candidatePoliticalParty",
        type: "string",
      },
      {
        internalType: "string",
        name: "candidatePortrait",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "changeElectionAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "closeElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "adminName",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "coverPhoto",
        type: "string",
      },
      {
        internalType: "string",
        name: "governingBody",
        type: "string",
      },
      {
        internalType: "string",
        name: "link",
        type: "string",
      },
      {
        internalType: "string",
        name: "country",
        type: "string",
      },
      {
        internalType: "string",
        name: "photo",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "registrationStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "registrationStop",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "electionStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "electionEnd",
        type: "uint256",
      },
    ],
    name: "createElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "electionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "elections",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
          {
            internalType: "string",
            name: "adminName",
            type: "string",
          },
          {
            internalType: "string",
            name: "electionTitle",
            type: "string",
          },
          {
            internalType: "string",
            name: "electionDescription",
            type: "string",
          },
          {
            internalType: "string",
            name: "electionCoverPhoto",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "electionStartTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "electionEndTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasStarted",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "hasEnded",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "electionTimeCreated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "electionRegistrationStartTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "electionRegistrationEndTime",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "electionCountry",
            type: "string",
          },
          {
            internalType: "bool",
            name: "electionAvailability",
            type: "bool",
          },
          {
            internalType: "string",
            name: "governingBody",
            type: "string",
          },
          {
            internalType: "string",
            name: "governingBodyTwitterLink",
            type: "string",
          },
          {
            internalType: "string",
            name: "governingBodyCover",
            type: "string",
          },
        ],
        internalType: "struct BallotBridge.ElectionDetails",
        name: "details",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "winnerId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "generateRandomNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllElections",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
          {
            internalType: "string",
            name: "adminName",
            type: "string",
          },
          {
            internalType: "string",
            name: "electionTitle",
            type: "string",
          },
          {
            internalType: "string",
            name: "electionDescription",
            type: "string",
          },
          {
            internalType: "string",
            name: "electionCoverPhoto",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "electionStartTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "electionEndTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasStarted",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "hasEnded",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "electionTimeCreated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "electionRegistrationStartTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "electionRegistrationEndTime",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "electionCountry",
            type: "string",
          },
          {
            internalType: "bool",
            name: "electionAvailability",
            type: "bool",
          },
          {
            internalType: "string",
            name: "governingBody",
            type: "string",
          },
          {
            internalType: "string",
            name: "governingBodyTwitterLink",
            type: "string",
          },
          {
            internalType: "string",
            name: "governingBodyCover",
            type: "string",
          },
        ],
        internalType: "struct BallotBridge.ElectionDetails[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "politicalParty",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "addedTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "candidatePhoto",
            type: "string",
          },
        ],
        internalType: "struct BallotBridge.Candidate[][]",
        name: "",
        type: "tuple[][]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
    ],
    name: "getCandidateInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "politicalParty",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "addedTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "candidatePhoto",
            type: "string",
          },
        ],
        internalType: "struct BallotBridge.Candidate",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getCandidates",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "politicalParty",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "addedTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "candidatePhoto",
            type: "string",
          },
        ],
        internalType: "struct BallotBridge.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getElectionDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
          {
            internalType: "string",
            name: "adminName",
            type: "string",
          },
          {
            internalType: "string",
            name: "electionTitle",
            type: "string",
          },
          {
            internalType: "string",
            name: "electionDescription",
            type: "string",
          },
          {
            internalType: "string",
            name: "electionCoverPhoto",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "electionStartTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "electionEndTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasStarted",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "hasEnded",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "electionTimeCreated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "electionRegistrationStartTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "electionRegistrationEndTime",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "electionCountry",
            type: "string",
          },
          {
            internalType: "bool",
            name: "electionAvailability",
            type: "bool",
          },
          {
            internalType: "string",
            name: "governingBody",
            type: "string",
          },
          {
            internalType: "string",
            name: "governingBodyTwitterLink",
            type: "string",
          },
          {
            internalType: "string",
            name: "governingBodyCover",
            type: "string",
          },
        ],
        internalType: "struct BallotBridge.ElectionDetails",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "politicalParty",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "addedTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "candidatePhoto",
            type: "string",
          },
        ],
        internalType: "struct BallotBridge.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getElectionSummary",
    outputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalCandidates",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalVoters",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votersWhoVoted",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "getElectionsForVoter",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGeneratedNumbers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "number",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct BallotBridge.GeneratedNumber[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
    ],
    name: "getVoterInfo",
    outputs: [
      {
        internalType: "address",
        name: "_voterAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_phoneNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_timeRegister",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getVoterList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getVotersWhoHaveVoted",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "OTP",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "phoneNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timeRegister",
        type: "uint256",
      },
    ],
    name: "registerVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
    ],
    name: "removeCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "adminName",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "coverPhoto",
        type: "string",
      },
      {
        internalType: "string",
        name: "governingBody",
        type: "string",
      },
      {
        internalType: "string",
        name: "link",
        type: "string",
      },
      {
        internalType: "string",
        name: "country",
        type: "string",
      },
      {
        internalType: "string",
        name: "photo",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "registrationStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "registrationStop",
        type: "uint256",
      },
    ],
    name: "updateElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const electionContractAddress = "0x4a16834828a148371a5cbf41340b6bdbb313aa4d";

module.exports = {
  electionContractAddress,
  electionContractABI,
};
