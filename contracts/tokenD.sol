// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;


contract tokenD{
    
    mapping(string => address) adrmap;
    mapping(address => uint256) validorg;
    string[] orgsval;
    address owner;
    
    
    constructor() {
        owner=msg.sender;
    }
    
    function setOrg(string memory orgname,address org) public{
        
        require(msg.sender==owner,"only owner function");
        adrmap[orgname]=org;
        orgsval.push(orgname);
        validorg[org]=1;
        
    }
    
    function returnOrgs() view public returns(string memory){
        
       uint256 i=0;
        string memory obj = "";
        string memory response = "";
        for (i = 0; i < orgsval.length; i += 1) {  // iterating through the data of held by imageHash[] and link[] for each token between both the bounds
                obj = string(abi.encodePacked(orgsval[i]));  // formation of JSON object
                response = string(abi.encodePacked(response," ",obj));
      } 
      return(response);
        
        
    }
    
    function transferDon(string memory orgn) payable public{
        address payable tra =  payable(adrmap[orgn]);
        
        tra.transfer(msg.value);
        
    }
    
}