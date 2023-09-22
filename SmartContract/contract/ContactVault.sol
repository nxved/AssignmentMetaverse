// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract ContactVault {
    struct Contact {
        string name;
        string phoneNumber;
        uint256 date;
    }

    mapping(address => Contact) public contacts;

    event ContactAdded(
        address indexed user,
        string name,
        string phoneNumber,
        uint256 date
    );
    event ContactDeleted(
        address indexed user,
        string name,
        string phoneNumber,
        uint256 date
    );

    function addOrUpdateContact(
        string memory _name,
        string memory _number
    ) public {
        require(
            bytes(_name).length > 0 && bytes(_number).length > 0,
            "Name and phone number are required."
        );
        contacts[msg.sender] = Contact(_name, _number, block.timestamp);
        emit ContactAdded(msg.sender, _name, _number, block.timestamp);
    }

    function deleteContact() public {
        require(
            bytes(contacts[msg.sender].name).length > 0,
            "Contact not found."
        );
        string memory deletedName = contacts[msg.sender].name;
        string memory deletedphoneNumber = contacts[msg.sender].phoneNumber;
        uint256 deletedDate = contacts[msg.sender].date;
        delete contacts[msg.sender];
        emit ContactDeleted(
            msg.sender,
            deletedName,
            deletedphoneNumber,
            deletedDate
        );
    }
}
