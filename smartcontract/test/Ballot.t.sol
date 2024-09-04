// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/Ballot.sol";

contract VotingSystemTest is Test {
    VotingSystem votingSystem;
    address admin = address(1);
    address voter1 = address(2);
    address voter2 = address(3);

    function setUp() public {
        vm.prank(admin); // Simulate admin calling
        votingSystem = new VotingSystem();
    }

    function testCreateElection() public {
        vm.prank(admin);
        votingSystem.createElection(
            "AdminName",
            "ElectionTitle",
            "ElectionDescription",
            "CoverPhoto",
            "GoverningBody",
            "GoverningBodyTwitterLink",
            "Country",
            "GoverningBodyCover",
            block.timestamp + 1 days,
            block.timestamp + 2 days,
            block.timestamp + 3 days,
            block.timestamp + 4 days
        );
        (string memory title, , , ) = votingSystem.getElectionSummary(1);
        assertEq(title, "ElectionTitle");
    }

    function testAddCandidate() public {
        testCreateElection();
        vm.prank(admin);
        votingSystem.addCandidate(1, "Candidate1", "Party1", "Photo1");
        VotingSystem.Candidate[] memory candidates = votingSystem.getCandidates(1);
        assertEq(candidates.length, 1);
        assertEq(candidates[0].name, "Candidate1");
    }

    function testRemoveCandidate() public {
        testAddCandidate();
        vm.prank(admin);
        votingSystem.removeCandidate(1, 1);
        VotingSystem.Candidate[] memory candidates = votingSystem.getCandidates(1);
        assertEq(candidates.length, 0);
    }

    function testRegisterVoter() public {
        testCreateElection();
        uint256 randomNumber = votingSystem.generateRandomNumber();
        vm.prank(voter1);
        votingSystem.registerVoter(1, voter1, uint64(randomNumber), 1234567890, block.timestamp);
        VotingSystem.Voter memory voter = votingSystem.getVoterInfo(1, voter1);
        assertEq(voter.voterAddress, voter1);
        assertEq(voter.phoneNumber, 1234567890);
    }

    function testVote() public {
        testRegisterVoter();
        testAddCandidate();
        vm.prank(voter1);
        votingSystem.vote(1, 1);
        VotingSystem.Candidate memory candidate = votingSystem.getCandidateInfo(1, 0);
        assertEq(candidate.voteCount, 1);
    }

    function testAnnounceWinner() public {
        testVote();
        vm.warp(block.timestamp + 5 days); // Move forward in time to end the election
        vm.prank(admin);
        votingSystem.closeElection(1);
        VotingSystem.Candidate memory winner = votingSystem.getCandidateInfo(1, 0);
        assertEq(winner.name, "Candidate1");
    }

    function testCloseElection() public {
        testVote();
        vm.prank(admin);
        votingSystem.closeElection(1);
        VotingSystem.Candidate memory candidate = votingSystem.getCandidateInfo(1, 0);
        assertEq(candidate.voteCount, 1);
        bool electionAvailability = votingSystem.getElectionDetails(1).electionAvailability;
        assertEq(electionAvailability, false);
    }

    function testGetVoterList() public {
        testRegisterVoter();
        address[] memory voterList = votingSystem.getVoterList(1);
        assertEq(voterList.length, 1);
        assertEq(voterList[0], voter1);
    }

    function testGetVotersWhoHaveVoted() public {
        testVote();
        address[] memory votersWhoVoted = votingSystem.getVotersWhoHaveVoted(1);
        assertEq(votersWhoVoted.length, 1);
        assertEq(votersWhoVoted[0], voter1);
    }

    function testGetGeneratedNumbers() public {
        testRegisterVoter();
        VotingSystem.GeneratedNumber[] memory numbers = votingSystem.getGeneratedNumbers();
        assertEq(numbers.length, 1);
    }
}
