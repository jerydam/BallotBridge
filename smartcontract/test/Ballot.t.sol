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
        vm.prank(admin);
        votingSystem = new VotingSystem();
    }

    function testCreateElection() public {
        vm.prank(admin);
        votingSystem.createElection("Admin Name", "Election Title", "Description", "Cover Photo", "Governing Body");

        VotingSystem.ElectionDetails memory election = votingSystem.getElection(1);

        assertEq(election.admin, admin);
        assertEq(election.title, "Election Title");
    }

    function testAddCandidate() public {
        vm.prank(admin);
        votingSystem.createElection("Admin Name", "Election Title", "Description", "Cover Photo", "Governing Body");

        vm.prank(admin);
        votingSystem.addCandidate(1, "Candidate Name", "Political Party");

        VotingSystem.Candidate[] memory candidates = votingSystem.getCandidates(1);
        assertEq(candidates.length, 1);
        assertEq(candidates[0].name, "Candidate Name");
    }

    function testRegisterVoter() public {
        vm.prank(admin);
        votingSystem.createElection("Admin Name", "Election Title", "Description", "Cover Photo", "Governing Body");

        vm.prank(voter1);
        votingSystem.registerVoter(1, voter1);

        VotingSystem.Voter memory voter = votingSystem.getVoter(1, voter1);
        assertTrue(voter.isRegistered);
    }

    function testVote() public {
        vm.prank(admin);
        votingSystem.createElection("Admin Name", "Election Title", "Description", "Cover Photo", "Governing Body");

        vm.prank(admin);
        votingSystem.addCandidate(1, "Candidate Name", "Political Party");

        vm.prank(voter1);
        votingSystem.registerVoter(1, voter1);

        vm.startPrank(voter1);
        votingSystem.vote(1, 1);

        VotingSystem.Voter memory voter = votingSystem.getVoter(1, voter1);
        assertTrue(voter.hasVoted);
        assertEq(voter.votedCandidateId, 1);

        VotingSystem.Candidate memory candidate = votingSystem.getCandidate(1, 1);
        assertEq(candidate.voteCount, 1);
        vm.stopPrank();
    }

    function testGetWinner() public {
        vm.prank(admin);
        votingSystem.createElection("Admin Name", "Election Title", "Description", "Cover Photo", "Governing Body");

        vm.prank(admin);
        votingSystem.addCandidate(1, "Candidate 1", "Party 1");
        vm.prank(admin);
        votingSystem.addCandidate(1, "Candidate 2", "Party 2");

        vm.prank(voter1);
        votingSystem.registerVoter(1, voter1);
        vm.prank(voter2);
        votingSystem.registerVoter(1, voter2);

        vm.prank(voter1);
        votingSystem.vote(1, 1);

        vm.prank(voter2);
        votingSystem.vote(1, 1);

        vm.prank(admin);
        votingSystem.startElection(1, 10); // 10 minutes duration

        // Advance time to end the election
        vm.warp(block.timestamp + 11 * 60);

        vm.prank(admin);
        votingSystem.endElection(1);

        VotingSystem.Candidate memory winner = votingSystem.getWinner(1);
        assertEq(winner.name, "Candidate 1");
    }
}
