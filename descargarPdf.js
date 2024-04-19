const fs = require('fs');
const web3 = require('web3');
const Certificate = require('./artifacts/contracts/Certificate.sol').abi;

const provider = new web3.providers.HttpProvider('HTTP://127.0.0.1:8545');
const web3Instance = new web3(provider);

const contractAddress = '0x...'; // Dirección del contrato inteligente
const certificateContract = new web3Instance.eth.Contract(Certificate, contractAddress);

async function downloadCertificate() {
    const certificateData = await certificateContract.methods.getCertificate().call();

    const pdfBuffer = await generatePDF(certificateData);
    const fileName = `certificado-${certificateData.name}.pdf`;

    fs.writeFileSync(fileName, pdfBuffer);
    console.log(`Certificado descargado en ${fileName}`);
}

downloadCertificate();