# Ballot Bridge Smart Contract

## Overview
This is a smart contract written in Solidity for a decentralized voting system. It allows for the creation of elections, registration of voters, voting, and the announcement of winners.

## Key Features
- **Election Creation**: Includes details such as title, description, start and end times, and registration periods.
- **Voter Registration**: With OTP verification.
- **Voting**: Allows candidate selection by registered voters.
- **Automatic Election End**: Automatically ends the election and announces the winner.
- **Election Information Retrieval**: Provides details about the election and candidate information.

## Functions

### Election Management
- **`createElection`**: Creates a new election with the provided details.
- **`updateElection`**: Updates an existing election's details.
- **`closeElection`**: Closes an election and announces the winner.

### Voter Management
- **`registerVoter`**: Registers a voter with OTP verification.
- **`vote`**: Allows a registered voter to cast their vote.

### Election Information
- **`getElectionSummary`**: Retrieves an election's summary information.
- **`getElectionDetails`**: Retrieves an election's detailed information and candidate list.
- **`getCandidateInfo`**: Retrieves a candidate's information.
- **`getAllElections`**: Retrieves all elections with details and candidate information.

## Events
- **`ElectionCreated`**
- **`ElectionUpdated`**
- **`CandidateAdded`**
- **`CandidateRemoved`**
- **`ElectionStarted`**
- **`ElectionEnded`**
- **`VoterRegistered`**
- **`Voted`**
- **`WinnerAnnounced`**
- **`ElectionClosed`**

## Modifiers
- **`onlyAdmin`**: Restricts access to admin-only functions.
- **`onlyOwner`**: Restricts access to owner-only functions.
- **`electionExists`**: Ensures the election exists before executing a function.
- **`electionEnded`**: Ensures the election has ended before executing a function.
- **`electionAvailable`**: Ensures the election is available before executing a function.

## Data Structures
- **`Candidate`**: Represents a candidate with details such as name, political party, and vote count.
- **`Voter`**: Represents a voter with details such as address, registration status, and voted candidate ID.
- **`Election`**: Represents an election with details such as title, start and end times, and candidate list.
- **`ElectionDetails`**: Represents an election's detailed information.
- **`ElectionData`**: Represents an election's data with details and candidate information.

## License
This smart contract is licensed under the MIT License.
