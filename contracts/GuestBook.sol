// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Guestbook {
    struct Entry {
        address sender;
        string name;
        string message;
        uint timestamp;
    }

    Entry[] public entries;

    event NewEntry(address indexed sender, string name, string message, uint timestamp);

    function sign(string memory _name, string memory _message) public {
        require(bytes(_message).length > 0, "Message cannot be empty");
        require(bytes(_message).length <= 280, "Message too long");

        Entry memory newEntry = Entry(msg.sender, _name, _message, block.timestamp);
        entries.push(newEntry);

        emit NewEntry(msg.sender, _name, _message, block.timestamp);
    }

    function getAllEntries() public view returns (Entry[] memory) {
        return entries;
    }
}
