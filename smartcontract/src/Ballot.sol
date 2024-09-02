// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {

    

    struct Candidate {
        uint256 id; // Unique ID for the candidate
        string name;
        string politicalParty;
        uint256 addedTime;
        uint256 voteCount; // Track the number of votes
        
    }

    struct Voter {
        address voterAddress;
        bool isRegistered;
        bool hasVoted; // Track if the voter has voted
        uint256 votedCandidateId; // Track the candidate ID voted for
    }

    struct ElectionDetails {
        address admin;
        string adminName;
        string title;
        string description;
        string coverPhoto;
        uint256 startTime;
        uint256 endTime;
        bool hasStarted;
        bool hasEnded;
        
    }

    struct Election {
        ElectionDetails details;
        string governBody;// Use an array for governing bodies
        Candidate[] candidates; // Use an array for candidates
        mapping(address => Voter) voters; // Mapping of voter addresses to voter details
        address[] voterList; // List of registered voter addresses for iteration
    }

    // Mapping to store elections by their ID
    mapping(uint256 => Election) public elections;
    uint256 public electionCount;

    // Mapping to track the next candidate ID for each election
    mapping(uint256 => uint256) private nextCandidateId;

    // Mapping to track elections created by each admin
    mapping(address => uint256[]) private electionsByAdmin;

    event ElectionCreated(
        uint256 indexed electionId,
        address indexed admin,
        string adminName,
        string title,
        string description,
        string coverPhoto
    );

    event ElectionUpdated(
        uint256 indexed electionId,
        string adminName,
        string title,
        string description,
        string coverPhoto
    );

    event GoverningBodyAssigned(
        uint256 indexed electionId,
        address governingBodyAddress
    );

    event CandidateAdded(
        uint256 indexed electionId,
        uint256 candidateId,
        string name,
        string politicalParty,
        uint256 addedTime
    );

    event CandidateRemoved(
        uint256 indexed electionId,
        uint256 candidateId
    );

    event ElectionStarted(
        uint256 indexed electionId,
        uint256 startTime
    );

    event ElectionEnded(
        uint256 indexed electionId,
        uint256 endTime
    );

    event VoterRegistered(
        uint256 indexed electionId,
        address indexed voterAddress
    );

    event Voted(
        uint256 indexed electionId,
        address indexed voterAddress,
        uint256 candidateId
    );

    constructor() {
        electionCount = 0;
    }

    function createElection(
        string memory adminName,
        string memory title,
        string memory description,
        string memory coverPhoto
    ) public {
        electionCount++;

        Election storage newElection = elections[electionCount];
        newElection.details = ElectionDetails({
            admin: msg.sender,
            adminName: adminName,
            title: title,
            description: description,
            coverPhoto: coverPhoto,
            startTime: 0,
            endTime: 0,
            hasStarted: false,
            hasEnded: false
        });

        // Initialize next candidate ID for the new election
        nextCandidateId[electionCount] = 1;

        // Track election created by this admin
        electionsByAdmin[msg.sender].push(electionCount);

        emit ElectionCreated(
            electionCount,
            msg.sender,
            adminName,
            title,
            description,
            coverPhoto
        );
    }

    function updateElection(
        uint256 electionId,
        string memory adminName,
        string memory title,
        string memory description,
        string memory coverPhoto
    ) public {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        require(elections[electionId].details.admin == msg.sender, "Only the admin can update the election.");
        require(!elections[electionId].details.hasStarted, "Cannot update election after it has started.");

        ElectionDetails storage details = elections[electionId].details;
        details.adminName = adminName;
        details.title = title;
        details.description = description;
        details.coverPhoto = coverPhoto;

        emit ElectionUpdated(
            electionId,
            adminName,
            title,
            description,
            coverPhoto
        );
    }

    function assignGoverningBody(uint256 electionId, address governingBodyAddress) public {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        require(elections[electionId].details.admin == msg.sender, "Only the admin can assign the governing body.");

        // Add new governing body to the array
        elections[electionId].governingBodies.push(GoverningBody({
            governingBodyAddress: governingBodyAddress
        }));

        emit GoverningBodyAssigned(
            electionId,
            governingBodyAddress
        );
    }

    function addCandidate(uint256 electionId, string memory name, string memory politicalParty) public {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        require(elections[electionId].details.admin == msg.sender, "Only the admin can add candidates.");
        require(!elections[electionId].details.hasStarted, "Cannot add candidates after the election has started.");

        uint256 candidateId = nextCandidateId[electionId];

        // Add new candidate to the array
        elections[electionId].candidates.push(Candidate({
            id: candidateId,
            name: name,
            politicalParty: politicalParty,
            addedTime: block.timestamp,
            voteCount: 0 // Initialize vote count
        }));

        // Increment the candidate ID for the next candidate
        nextCandidateId[electionId]++;

        emit CandidateAdded(
            electionId,
            candidateId,
            name,
            politicalParty,
            block.timestamp
        );
    }

    function removeCandidate(uint256 electionId, uint256 candidateId) public {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        require(elections[electionId].details.admin == msg.sender, "Only the admin can remove candidates.");
        require(!elections[electionId].details.hasStarted, "Cannot remove candidates after the election has started.");

        // Find the candidate index
        int256 candidateIndex = -1;
        for (uint256 i = 0; i < elections[electionId].candidates.length; i++) {
            if (elections[electionId].candidates[i].id == candidateId) {
                candidateIndex = int256(i);
                break;
            }
        }

        require(candidateIndex >= 0, "Candidate does not exist.");

        // Remove the candidate by swapping with the last candidate and then pop
        uint256 index = uint256(candidateIndex);
        uint256 lastIndex = elections[electionId].candidates.length - 1;

        if (index != lastIndex) {
            elections[electionId].candidates[index] = elections[electionId].candidates[lastIndex];
        }

        elections[electionId].candidates.pop();

        emit CandidateRemoved(
            electionId,
            candidateId
        );
    }

    function startElection(uint256 electionId, uint256 durationInMinutes) public {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        require(elections[electionId].details.admin == msg.sender, "Only the admin can start the election.");
        require(!elections[electionId].details.hasStarted, "Election has already started.");
        require(!elections[electionId].details.hasEnded, "Election has already ended.");

        ElectionDetails storage details = elections[electionId].details;
        details.startTime = block.timestamp;
        details.endTime = block.timestamp + durationInMinutes * 1 minutes;
        details.hasStarted = true;

        emit ElectionStarted(
            electionId,
            block.timestamp
        );
    }

    function endElection(uint256 electionId) public {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        require(elections[electionId].details.admin == msg.sender, "Only the admin can end the election.");
        require(elections[electionId].details.hasStarted, "Election has not started.");
        require(!elections[electionId].details.hasEnded, "Election has already ended.");
        require(block.timestamp >= elections[electionId].details.endTime, "Cannot end election before end time.");

        ElectionDetails storage details = elections[electionId].details;
        details.endTime = block.timestamp;
        details.hasEnded = true;

        emit ElectionEnded(
            electionId,
            block.timestamp
        );
    }

    function registerVoter(uint256 electionId, address voterAddress) public {
        require(msg.sender == voterAddress, "you can't regiser for others");
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        require(!elections[electionId].details.hasStarted, "Cannot register voters after the election has started.");

        // Register the voter
        elections[electionId].voters[voterAddress] = Voter({
            voterAddress: voterAddress,
            isRegistered: true,
            hasVoted: false,
            votedCandidateId: 0
        });

        // Add voter to the list for iteration
        elections[electionId].voterList.push(voterAddress);

        emit VoterRegistered(
            electionId,
            voterAddress
        );
    }

    function vote(uint256 electionId, uint256 candidateId) public {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        Election storage election = elections[electionId];
        Voter storage voter = election.voters[msg.sender];

        require(election.details.hasStarted, "Election has not started.");
        require(!election.details.hasEnded, "Election has ended.");
        require(voter.isRegistered, "Voter is not registered.");
        require(!voter.hasVoted, "Voter has already voted.");
        
        // Find the candidate index
        int256 candidateIndex = -1;
        for (uint256 i = 0; i < election.candidates.length; i++) {
            if (election.candidates[i].id == candidateId) {
                candidateIndex = int256(i);
                break;
            }
        }

        require(candidateIndex >= 0, "Candidate does not exist.");

        // Increment the candidate's vote count
        election.candidates[uint256(candidateIndex)].voteCount++;

        // Mark the voter as having voted
        voter.hasVoted = true;
        voter.votedCandidateId = candidateId;

        emit Voted(
            electionId,
            msg.sender,
            candidateId
        );
    }

    function getElection(uint256 electionId) public view returns (
        address admin,
        string memory adminName,
        string memory title,
        string memory description,
        string memory coverPhoto,
        GoverningBody[] memory governingBodies,
        Candidate[] memory candidates,
        uint256 startTime,
        uint256 endTime,
        bool hasStarted,
        bool hasEnded
    ) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");

        Election storage election = elections[electionId];
        ElectionDetails storage details = election.details;

        return (
            details.admin,
            details.adminName,
            details.title,
            details.description,
            details.coverPhoto,
            election.governingBodies,
            election.candidates,
            details.startTime,
            details.endTime,
            details.hasStarted,
            details.hasEnded
        );
    }

    function getElectionsByAdmin(address admin) public view returns (uint256[] memory) {
        return electionsByAdmin[admin];
    }

    function getRegisteredVoters(uint256 electionId) public view returns (address[] memory) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        return elections[electionId].voterList;
    }

    function getNumberOfRegisteredVoters(uint256 electionId) public view returns (uint256) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        return elections[electionId].voterList.length;
    }

    function getNumberOfVotersWhoHaveVoted(uint256 electionId) public view returns (uint256) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        
        uint256 votedCount = 0;
        Election storage election = elections[electionId];

        for (uint256 i = 0; i < election.voterList.length; i++) {
            address voterAddress = election.voterList[i];
            if (election.voters[voterAddress].hasVoted) {
                votedCount++;
            }
        }

        return votedCount;
    }

    function getCandidateVoteCount(uint256 electionId, uint256 candidateId) public view returns (uint256) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        
        // Find the candidate index
        int256 candidateIndex = -1;
        Election storage election = elections[electionId];
        for (uint256 i = 0; i < election.candidates.length; i++) {
            if (election.candidates[i].id == candidateId) {
                candidateIndex = int256(i);
                break;
            }
        }

        require(candidateIndex >= 0, "Candidate does not exist.");

        return election.candidates[uint256(candidateIndex)].voteCount;
    }

    function announceWinner(uint256 electionId) public view returns (
        uint256 winnerId,
        string memory winnerName,
        string memory winnerPoliticalParty,
        uint256 winnerVoteCount
    ) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        require(elections[electionId].details.hasEnded, "Election has not ended yet.");

        Election storage election = elections[electionId];
        uint256 highestVoteCount = 0;
        Candidate memory winner;

        for (uint256 i = 0; i < election.candidates.length; i++) {
            if (election.candidates[i].voteCount > highestVoteCount) {
                highestVoteCount = election.candidates[i].voteCount;
                winner = election.candidates[i];
            }
        }

        return (
            winner.id,
            winner.name,
            winner.politicalParty,
            winner.voteCount
        );
    }
}
