pragma solidity ^0.5.16;

contract ScoreStore {
    mapping (string => int) public PersonScores;

    function AddPersonScore(string memory name, int256 score) public {
        PersonScores[name] = score;
    }

    function GetScore(string memory name) public returns (int256) {
        return PersonScores[name];
    }
}
