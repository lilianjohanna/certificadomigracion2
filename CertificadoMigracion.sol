// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CertificateVerifier {
    // Estructura para almacenar los datos del certificado
    struct Certificate {
        string pdfHash; // Hash del certificado PDF
        bytes32 merkleRoot; // Raíz del árbol de Merkle
        bytes signature; // Firma ECDSA
    }

    // Almacena los certificados emitidos
    mapping(string => Certificate) certificates;

    // Función para almacenar un nuevo certificado
    function storeCertificate(string memory _pdfHash, bytes32 _merkleRoot, bytes memory _signature) public {
        certificates[_pdfHash] = Certificate(_pdfHash, _merkleRoot, _signature);
    }

    // Función para verificar la autenticidad de un certificado
    function verifyCertificate(string memory _pdfHash, bytes32[] memory _proof, bytes32 _leaf) public view returns (bool) {
        // Verificar la firma ECDSA
        address signer = recoverSigner(_pdfHash, certificates[_pdfHash].signature);
        require(signer != address(0), "Firma no valida");

        // Verificar la prueba de Merkle
        require(MerkleProof.verify(_proof, certificates[_pdfHash].merkleRoot, _leaf), "Prueba de Merkle no valida");

        // El certificado es válido si la firma y la prueba de Merkle son válidas
        return true;
    }

    // Función para recuperar el firmante de un mensaje mediante ECDSA
    function recoverSigner(string memory _message, bytes memory _signature) internal pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        // Recuperar los componentes de la firma
        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }

        // Recuperar el firmante utilizando ECDSA
        return ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", keccak256(abi.encodePacked(_message)))), v, r, s);
    }
}