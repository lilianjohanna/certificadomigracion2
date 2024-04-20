const fs = require('fs');
const Web3 = require('web3');
const HttpProvider = Web3.providers.HttpProvider;
const Certificate = require('./Contract_sol_Certificate.abi').abi;

const provider = Web3.providers.HttpProvider('http://127.0.0.1:8545');
const web3Instance = new Web3(provider);

const contractAddress = '0xdecf98879b05e0fbf586a5013ad7913ee71cc156'; // Dirección del contrato inteligente
const certificateContract = new web3Instance.eth.Contract(Certificate, contractAddress);

async function downloadCertificate() {
    const certificateData = await certificateContract.methods.getCertificate().call();

    const pdfBuffer = await generatePDF(certificateData);
    const fileName = `certificado-${certificateData.name}.pdf`;

    fs.writeFileSync(fileName, pdfBuffer);
    console.log(`Certificado descargado en ${fileName}`);
}

downloadCertificate();