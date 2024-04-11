// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HolaMundo {
    string public mensaje;

    constructor() {
        mensaje = "Hola Mundo este mensaje fue editado por segunda vez";
    }

    function obtenerMensaje() public view returns (string memory) {
        return mensaje;
    }

    function cambiarMensaje(string memory nuevoMensaje) public {
        mensaje = nuevoMensaje;
    }
}
