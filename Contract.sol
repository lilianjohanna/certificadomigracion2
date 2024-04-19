// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Certificate {

    struct CertificateData {
        string name;
        string course;
        string institution;
        string date;
    }

    mapping(address => CertificateData) public certificates;

    event CertificateIssued(address recipient, CertificateData certificate);

    function issueCertificate(string memory _name, string memory _course, string memory _institution, string memory _date) public {
        certificates[msg.sender] = CertificateData(_name, _course, _institution, _date);
        emit CertificateIssued(msg.sender, CertificateData(_name, _course, _institution, _date));
    }

    function getCertificate() public view returns (CertificateData memory) {
        return certificates[msg.sender];
    }
}