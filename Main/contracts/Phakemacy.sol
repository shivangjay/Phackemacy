pragma solidity ^0.8.13;

contract phackemacy{

    uint public medav = 0;
    string public name= "phackemacy"
    mapping(uint=>medicine) public medicines;
}

struct medicine{
    
    uint id;
    string has;
    string mname;
    address manuf;

}

event medcheck{

    uint id;
    string has;
    string mname;
    address manuf;

}


constructor() public{

    function Checkmed(string memory id, string memory mname) public{

        require(bytes(id.length > 0));
        require(bytes(mname.length > 0));
        require(msg.sender!=address(0));

        medav++;

        medicines[medav] = medicine[mid, mhas, mname, msg.sender];
        emit medcheck(mid, mhas, mname, msg.sender);

    }
}


