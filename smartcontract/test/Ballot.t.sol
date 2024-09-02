// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Ballot.sol";

contract VotingSystemTest is Test {
    VotingSystem public votingSystem;
    address public admin;
    address public voter1;
    address public voter2;
    address public candidateAddress1;
    address public candidateAddress2;

    function setUp() public {
        votingSystem = new VotingSystem();
        admin = address(this); // Use the test contract address as the admin
        voter1 = address(0x123);
        voter2 = address(0x456);
        candidateAddress1 = address(0x789);
        candidateAddress2 = address(0xabc);

        // Create an election
        votingSystem.createElection(
            "Admin Name",
            "Election Title",
            "Election Description",
            "coverPhotoUrl"
        );
    }

    function testCreateElection() public {
        (
            address adminAddress,
            string memory adminName,
            string memory title,
            string memory description,
            string memory coverPhoto,
            VotingSystem.GoverningBody[] memory governingBodies,
            VotingSystem.Candidate[] memory candidates,
            uint256 startTime,
            uint256 endTime,
            bool hasStarted,
            bool hasEnded
        ) = votingSystem.getElection(1);

        assertEq(adminAddress, admin);
        assertEq(adminName, "Admin Name");
        assertEq(title, "Election Title");
        assertEq(description, "Election Description");
        assertEq(coverPhoto, "coverPhotoUrl");
        assertEq(startTime, 0);
        assertEq(endTime, 0);
        assertEq(hasStarted, false);
        assertEq(hasEnded, false);
        assertEq(governingBodies.length, 0); // Ensure no governing bodies are assigned yet
        assertEq(candidates.length, 0); // Ensure no candidates are added yet
    }

    function testUpdateElection() public {
        votingSystem.updateElection(1, "Updated Admin Name", "Updated Title", "Updated Description", "updatedCoverPhotoUrl");

        (
            address adminAddress,
            string memory adminName,
            string memory title,
            string memory description,
            string memory coverPhoto,
            VotingSystem.GoverningBody[] memory governingBodies,
            VotingSystem.Candidate[] memory candidates,
            uint256 startTime,
            uint256 endTime,
            bool hasStarted,
            bool hasEnded
        ) = votingSystem.getElection(1);

        assertEq(adminAddress, admin);
        assertEq(adminName, "Updated Admin Name");
        assertEq(title, "Updated Title");
        assertEq(description, "Updated Description");
        assertEq(coverPhoto, "updatedCoverPhotoUrl");
        assertEq(startTime, 0);
        assertEq(endTime, 0);
        assertEq(hasStarted, false);
        assertEq(hasEnded, false);
        assertEq(governingBodies.length, 0); // Still no governing bodies
        assertEq(candidates.length, 0); // Still no candidates
    }

    function testAssignGoverningBody() public {
        votingSystem.assignGoverningBody(1, address(0x999));

        (
            address adminAddress,
            string memory adminName,
            string memory title,
            string memory description,
            string memory coverPhoto,
            VotingSystem.GoverningBody[] memory governingBodies,
            VotingSystem.Candidate[] memory candidates,
            uint256 startTime,
            uint256 endTime,
            bool hasStarted,
            bool hasEnded
        ) = votingSystem.getElection(1);

        assertEq(governingBodies.length, 1);
        assertEq(governingBodies[0].governingBodyAddress, address(0x999));
    }

    function testAddCandidate() public {
        votingSystem.addCandidate(1, "Candidate Name 1", "Political Party 1");
        votingSystem.addCandidate(1, "Candidate Name 2", "Political Party 2");

        (
            address adminAddress,
            string memory adminName,
            string memory title,
            string memory description,
            string memory coverPhoto,
            VotingSystem.GoverningBody[] memory governingBodies,
            VotingSystem.Candidate[] memory candidates,
            uint256 startTime,
            uint256 endTime,
            bool hasStarted,
            bool hasEnded
        ) = votingSystem.getElection(1);

        assertEq(candidates.length, 2);
        assertEq(candidates[0].name, "Candidate Name 1");
        assertEq(candidates[1].name, "Candidate Name 2");
    }

    function testRemoveCandidate() public {
        votingSystem.addCandidate(1, "Candidate Name 1", "Political Party 1");
        votingSystem.removeCandidate(1, 1);

        (
            address adminAddress,
            string memory adminName,
            string memory title,
            string memory description,
            string memory coverPhoto,
            VotingSystem.GoverningBody[] memory governingBodies,
            VotingSystem.Candidate[] memory candidates,
            uint256 startTime,
            uint256 endTime,
            bool hasStarted,
            bool hasEnded
        ) = votingSystem.getElection(1);

        assertEq(candidates.length, 0); // Ensure candidate list is empty
    }

    function testRegisterVoter() public {
        votingSystem.registerVoter(1, voter1);
        
        address[] memory registeredVoters = votingSystem.getRegisteredVoters(1);

        assertEq(registeredVoters[0], voter1);
    }

    function testVote() public {
        votingSystem.addCandidate(1, "Candidate Name", "Political Party");
        votingSystem.registerVoter(1, voter1);

        // Simulate voting
        vm.startPrank(voter1);
        votingSystem.vote(1, 1);
        vm.stopPrank();

        uint256 voteCount = votingSystem.getCandidateVoteCount(1, 1);
        assertEq(voteCount, 1);
    }

    function testStartAndEndElection() public {
        votingSystem.startElection(1, 1); // Start election with 1-minute duration
        (
            address adminAddress,
            string memory adminName,
            string memory title,
            string memory description,
            string memory coverPhoto,
            VotingSystem.GoverningBody[] memory governingBodies,
            VotingSystem.Candidate[] memory candidates,
            uint256 startTime,
            uint256 endTime,
            bool hasStarted,
            bool hasEnded
        ) = votingSystem.getElection(1);

        assertEq(hasStarted, true);
        assertEq(endTime > startTime, true); // Ensure end time is after start time

        // Move time forward
        vm.warp(endTime + 1);

        votingSystem.endElection(1);
        (
            address adminAddressAfter,
            string memory adminNameAfter,
            string memory titleAfter,
            string memory descriptionAfter,
            string memory coverPhotoAfter,
            VotingSystem.GoverningBody[] memory governingBodiesAfter,
            VotingSystem.Candidate[] memory candidatesAfter,
            uint256 startTimeAfter,
            uint256 endTimeAfter,
            bool hasStartedAfter,
            bool hasEndedAfter
        ) = votingSystem.getElection(1);

        assertEq(hasEndedAfter, true);
    }

    function testAnnounceWinner() public {
        votingSystem.addCandidate(1, "Winner", "Party");
        votingSystem.registerVoter(1, voter1);
        votingSystem.startElection(1, 10); // Start with 10-minute duration

        // Simulate voting
        vm.startPrank(voter1);
        votingSystem.vote(1, 1);
        vm.stopPrank();

        // End the election
        vm.warp(block.timestamp + 10 minutes);
        votingSystem.endElection(1);

        // Announce the winner
        (
            uint256 winnerId,
            string memory winnerName,
            string memory winnerPoliticalParty,
            uint256 winnerVoteCount
        ) = votingSystem.announceWinner(1);

        assertEq(winnerName, "Winner");
        assertEq(winnerVoteCount, 1);
    }
}
