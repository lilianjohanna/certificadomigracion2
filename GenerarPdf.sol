// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificado {
    struct DatosCertificado {
        address destinatario;
        string nombre;
        string fechaEmision;
        // Otros datos relevantes del certificado
    }
    
    mapping (address => DatosCertificado) certificados;
    
    function emitirCertificado(address _destinatario, string memory _nombre, string memory _fechaEmision) public {
        DatosCertificado memory nuevoCertificado = DatosCertificado(_destinatario, _nombre, _fechaEmision);
        certificados[_destinatario] = nuevoCertificado;
    }
    
    function obtenerDatosCertificado(address _destinatario) public view returns (string memory, string memory) {
        DatosCertificado memory datos = certificados[_destinatario];
        return (datos.nombre, datos.fechaEmision);
    }
}
