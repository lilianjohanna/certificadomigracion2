// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Record {

    event NewRecord(uint id);
    uint256[] public records;
    mapping (uint => address) public recordToOwner;
    mapping (address => uint) ownerRecordCount;

    function storeRecord(uint256 _recordHash) public {
        records.push(_recordHash);
        uint id = records.length - 1;
        recordToOwner[id] = msg.sender;
        emit NewRecord(id);
    }

    function updateRecord(uint256 _id, uint256 _newRecordHash) public {
        records[_id] = _newRecordHash;
    }

    function checkRecord(uint256 _recordHash) public view returns (bool){
        for (uint i=0; i<records.length; i++) {
            if (records[i] == _recordHash){
                return true;
            }
        }
        return false;
    }

    function getRecord(uint256 _id) public view returns (uint256){
            return records[_id];
    }
    
}