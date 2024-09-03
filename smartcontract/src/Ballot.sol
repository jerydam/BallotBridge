// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VotingSystem {
    uint256 private secretCode;

    constructor() {
        secretCode = 326723; // Initialize the secret code
        electionCount = 0;
    }

    // Data Structures

    struct Candidate {
        uint256 id; // Unique ID for the candidate
        string name;
        string politicalParty;
        uint256 addedTime;
        uint256 voteCount; // Track the number of votes
        string candidatePhoto;
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
        string electionTitle; // Field name update to match
        string electionDescription;
        string electionCoverPhoto;
        uint256 electionStartTime;
        uint256 electionEndTime;
        bool hasStarted;
        bool hasEnded;
        uint256 electionTimeCreated;
        uint256 electionRegistrationStartTime;
        uint256 electionRegistrationEndTime;
        string electionCountry;
        bool electionAvailability; // Field name update to match
        string governingBody;
        string governingBodyTwitterLink;
        string governingBodyCover;
    }

    struct GeneratedNumber {
        uint256 number;
        uint256 timestamp;
    }

    struct Election {
        ElectionDetails details;
        Candidate[] candidates;
        mapping(address => Voter) voters;
        address[] voterList;
        uint256 winnerId; // Track the winning candidate ID
    }

    // State Variables

    mapping(uint256 => Election) public elections;
    mapping(uint256 => uint256) private nextCandidateId;
    mapping(address => uint256[]) private electionsByAdmin;
    mapping(address => GeneratedNumber[]) private generatedNumbers;

    uint256 public electionCount;

    // Events

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

    event WinnerAnnounced(
        uint256 indexed electionId,
        uint256 indexed winnerId,
        string winnerName,
        uint256 voteCount
    );

    event ElectionClosed(
        uint256 indexed electionId,
        uint256 closedTime
    );

    // Modifiers

    modifier onlyAdmin(uint256 electionId) {
        require(elections[electionId].details.admin == msg.sender, "Only the admin can perform this action.");
        _;
    }
    
    modifier onlyOwner(address owner) {
        require(msg.sender == owner, "Invalid user");
        _;
    }

    modifier electionExists(uint256 electionId) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist.");
        _;
    }

    modifier electionEnded(uint256 electionId) {
        require(elections[electionId].details.hasEnded, "Election has not ended.");
        _;
    }

    modifier electionAvailable(uint256 electionId) {
        require(elections[electionId].details.electionAvailability, "Election is not available.");
        _;
    }

    // Functions

    function createElection(
        string memory adminName,
        string memory title,
        string memory description,
        string memory coverPhoto,
        string memory governingBody,
        string memory link, // Governing body Twitter link
        string memory country, // Country of the election
        string memory photo, // Governing body cover photo
        uint256 registrationStart,
        uint256 registrationStop

    ) public {
        electionCount++;

        Election storage newElection = elections[electionCount];
        newElection.details = ElectionDetails({
            admin: msg.sender,
            adminName: adminName,
            electionTitle: title,
            electionDescription: description,
            electionCoverPhoto: coverPhoto,
            electionStartTime: 0,
            electionEndTime: 0,
            hasStarted: false,
            hasEnded: false,
            electionTimeCreated: block.timestamp,
            electionRegistrationStartTime: registrationStart,
            electionRegistrationEndTime: registrationStop,
            electionCountry: country,
            electionAvailability: true,
            governingBody: governingBody,
            governingBodyTwitterLink: link,
            governingBodyCover: photo
        });

        nextCandidateId[electionCount] = 1;
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
        string memory coverPhoto,
        string memory governingBody,
        string memory link, // Governing body Twitter link
        string memory country, // Country of the election
        string memory photo, // Governing body cover photo
        uint256 registrationStart,
        uint256 registrationStop
    ) public electionExists(electionId) onlyAdmin(electionId) {
        require(!elections[electionId].details.hasStarted, "Cannot update election after it has started.");

        ElectionDetails storage details = elections[electionId].details;
        details.adminName = adminName;
        details.electionTitle = title;
        details.electionDescription = description;
        details.electionCoverPhoto = coverPhoto;
        details.electionTimeCreated = block.timestamp;
        details.electionRegistrationStartTime = registrationStart;
        details.electionRegistrationEndTime = registrationStop;
        details.electionCountry = country;
        details.electionAvailability= true;
        details.governingBody= governingBody;
        details.governingBodyTwitterLink= link;
        details.governingBodyCover= photo;
        emit ElectionUpdated(
            electionId,
            adminName,
            title,
            description,
            coverPhoto
        );
    }

    function addCandidate(
        uint256 electionId,
        string memory candidateName,
        string memory candidatePoliticalParty,
        string memory candidatePortrait
    ) public electionExists(electionId) onlyAdmin(electionId) {
        require(!elections[electionId].details.hasStarted, "Cannot add candidates after the election has started.");

        uint256 candidateId = nextCandidateId[electionId];

        elections[electionId].candidates.push(Candidate({
            id: candidateId,
            name: candidateName,
            politicalParty: candidatePoliticalParty,
            addedTime: block.timestamp,
            candidatePhoto: candidatePortrait,
            voteCount: 0
        }));

        nextCandidateId[electionId]++;

        emit CandidateAdded(
            electionId,
            candidateId,
            candidateName,
            candidatePoliticalParty,
            block.timestamp
        );
    }

    function removeCandidate(uint256 electionId, uint256 candidateId) public electionExists(electionId) onlyAdmin(electionId) {
        require(!elections[electionId].details.hasStarted, "Cannot remove candidates after the election has started.");

        int256 candidateIndex = -1;
        for (uint256 i = 0; i < elections[electionId].candidates.length; i++) {
            if (elections[electionId].candidates[i].id == candidateId) {
                candidateIndex = int256(i);
                break;
            }
        }

        require(candidateIndex >= 0, "Candidate does not exist.");

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

    function startElection(uint256 electionId, uint256 durationInMinutes) public electionExists(electionId) onlyAdmin(electionId) {
        require(!elections[electionId].details.hasStarted, "Election has already started.");
        require(!elections[electionId].details.hasEnded, "Election has already ended.");

        ElectionDetails storage details = elections[electionId].details;
        details.electionStartTime = block.timestamp;
        details.electionEndTime = block.timestamp + durationInMinutes * 1 minutes;
        details.hasStarted = true;

        emit ElectionStarted(
            electionId,
            block.timestamp
        );
    }

    function endElection(uint256 electionId) public electionExists(electionId) onlyAdmin(electionId) {
        require(elections[electionId].details.hasStarted, "Election has not started.");
        require(!elections[electionId].details.hasEnded, "Election has already ended.");
        require(block.timestamp >= elections[electionId].details.electionEndTime, "Cannot end election before end time.");

        ElectionDetails storage details = elections[electionId].details;
        details.electionEndTime = block.timestamp;
        details.hasEnded = true;

        emit ElectionEnded(
            electionId,
            block.timestamp
        );

        announceWinner(electionId);
    }

    function generateRandomNumber() public returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 900000;
        generatedNumbers[msg.sender].push(GeneratedNumber({
            number: randomNumber,
            timestamp: block.timestamp
        }));
        return randomNumber;
    }

    function announceWinner(uint256 electionId) internal electionExists(electionId) electionEnded(electionId) {
        uint256 winningVoteCount = 0;
        uint256 winnerId = 0;

        for (uint256 i = 0; i < elections[electionId].candidates.length; i++) {
            if (elections[electionId].candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = elections[electionId].candidates[i].voteCount;
                winnerId = elections[electionId].candidates[i].id;
            }
        }

        elections[electionId].winnerId = winnerId;

        emit WinnerAnnounced(
            electionId,
            winnerId,
            elections[electionId].candidates[winnerId].name,
            winningVoteCount
        );
    }

    function closeElection(uint256 electionId) public electionExists(electionId) onlyAdmin(electionId) {
        require(elections[electionId].details.electionAvailability == true, "election already closed.");
        elections[electionId].details.electionAvailability == false;
        emit ElectionClosed(
            electionId,
            block.timestamp
        );
    }

    function registerVoter(uint256 electionId, address voterAddress) public electionExists(electionId) onlyAdmin(electionId) {
        require(!elections[electionId].details.hasStarted, "Cannot register voters after the election has started.");

        Election storage election = elections[electionId];
        require(!election.voters[voterAddress].isRegistered, "Voter is already registered.");

        election.voters[voterAddress] = Voter({
            voterAddress: voterAddress,
            isRegistered: true,
            hasVoted: false,
            votedCandidateId: 0
        });

        election.voterList.push(voterAddress);

        emit VoterRegistered(
            electionId,
            voterAddress
        );
    }

    function vote(uint256 electionId, uint256 candidateId) public electionExists(electionId) electionAvailable(electionId) {
        Election storage election = elections[electionId];
        Voter storage voter = election.voters[msg.sender];

        require(voter.isRegistered, "You are not registered to vote.");
        require(!voter.hasVoted, "You have already voted.");
        require(election.details.hasStarted, "Election has not started.");
        require(block.timestamp <= election.details.electionEndTime, "Election has ended.");

        bool candidateExists = false;
        for (uint256 i = 0; i < election.candidates.length; i++) {
            if (election.candidates[i].id == candidateId) {
                candidateExists = true;
                break;
            }
        }
        require(candidateExists, "Candidate does not exist.");

        election.candidates[candidateId].voteCount++;
        voter.hasVoted = true;
        voter.votedCandidateId = candidateId;

        emit Voted(
            electionId,
            msg.sender,
            candidateId
        );
    }

    function getElectionDetails(uint256 electionId) public view electionExists(electionId) returns (ElectionDetails memory) {
        return elections[electionId].details;
    }

    function getCandidates(uint256 electionId) public view electionExists(electionId) returns (Candidate[] memory) {
        return elections[electionId].candidates;
    }

    function getVoterInfo(uint256 electionId, address voterAddress) public view electionExists(electionId) returns (Voter memory) {
        return elections[electionId].voters[voterAddress];
    }

    function getVoterList(uint256 electionId) public view electionExists(electionId) returns (address[] memory) {
        return elections[electionId].voterList;
    }

    function getGeneratedNumbers() public view returns (GeneratedNumber[] memory) {
        return generatedNumbers[msg.sender];
    }
}
