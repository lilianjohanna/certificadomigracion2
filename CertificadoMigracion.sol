// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {

    struct CertificateData {
        string name;
        uint256 issuanceDate;
        uint256 expirationDate;
        address issuer;
    }

    mapping(address => CertificateData) public certificates;

    event CertificateIssued(address indexed recipient, CertificateData certificateData);

    function issueCertificate(address recipient, string memory name, uint256 expirationDate) public {
        require(msg.sender != recipient, "Cannot issue certificate to yourself");
        require(expirationDate > block.timestamp, "Expiration date must be in the future");

        CertificateData memory certificateData = CertificateData({
            name: name,
            issuanceDate: block.timestamp,
            expirationDate: expirationDate,
            issuer: msg.sender
        });

        certificates[recipient] = certificateData;

        emit CertificateIssued(recipient, certificateData);
    }

    function getCertificateData(address recipient) public view returns (CertificateData memory) {
        return certificates[recipient];
    }
}
