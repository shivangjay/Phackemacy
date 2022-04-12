pragma solidity ^0.8.13;

contract phackemacy{

    uint public medav = 0;
    string public name= "phackemacy"
    mapping(uint=>Medicine) public medicines;
}

struct Medicine{
    
    uint impcode;
    string has;
    string mname;
    string manuf;

}

event Medcheck{

    uint impcode;
    string has;
    string mname;
    string manuf;

}


constructor() public{

    function Checkmed(string memory impcode, string memory mname) public{

        require(bytes(impcode.length > 0));
        require(bytes(mname.length > 0));
        require(msg.sender!=address(0));

        medav++;

        medicines[medav] = Medicine[Mimpcode, Mhas, Mname, Mmanu];
        emit Medcheck(Mimpcode, Mhas, Mname, Mmanu);

    }
}


