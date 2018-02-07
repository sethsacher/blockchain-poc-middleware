pragma solidity ^0.4.17;

contract SimpleStorage {
    uint storedData = 0;

    function set(uint x) public {
        storedData = x;
    }

    function get() public returns (uint) {
        return storedData;
    }
}
