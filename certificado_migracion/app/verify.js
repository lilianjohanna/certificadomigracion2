const verifyMessage = async ({ message, address, signature }) => {
    try {
      const signerAddr = await ethers.utils.verifyMessage(message, signature);
      if (signerAddr !== address) {
        return false;
      }
      return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const handleVerification = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const isValid = await verifyMessage({
    message: data.get("message"),
    address: data.get("address"),
    signature: data.get("signature")
  });

  if (isValid) {
    document.getElementById('validSignature').innerHTML = "♦ Envío de solicitud correcta, verificando la existencia de la clave... <br/>";

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    const record = NPP.getRecordByPubk(account);

    if (record == undefined) {
      document.getElementById('validSignature').innerHTML = "♦ Su clave pública no coincide con algún certificado. <br/>";
      return;
    }

    document.getElementById('validSignature').innerHTML = "♦ Certificado detectado. <br/>";

    if (record.role == "1" ) {
      sessionStorage.setItem('activeUserRole', record.role);

      if (record.txHash == ""){
        document.getElementById('recordExists').innerHTML = "♦ Certificado no rastreado por el Bockchain. Hay que esperar la aprobación. Vuelva más tarde.<br/>";
      } else {
        console.log("♦ Certificado no nulo, solicitando información...");
        displayPaneToUser(record);
      }
    
    } else if (record.role == "2" ) {
      sessionStorage.setItem('activeUserRole', record.role);
      displayPaneToUser();
    }

  } else {
    document.getElementById('validSignature').innerHTML = "♦ Firma digital inválida, inténtelo de nuevo.";
  }

};

function displayPaneToUser(record) {
  var role = sessionStorage.getItem('activeUserRole');
  switch(role){
    case '1':
      console.log("Student (1)");
      setFile(record);
      displayOne(record, "verifyTable");
      document.getElementById('btnDownload').setAttribute("style", "display: block;");
      document.getElementById('closeForm').setAttribute("style", "display: block;");

    break;
    case '2':
      console.log("Admin (2)");
      document.getElementById('updateForm').setAttribute("style", "display: block;");
      document.getElementById('moreOptionsForm').setAttribute("style", "display: block;");
      document.getElementById('closeForm').setAttribute("style", "display: block;");

    break;
    default:
      window.location.href = '/app/indexVerify.html';
    break;
  }

}

const verifyForm = document.querySelector("#verifyForm");

if (verifyForm) {
  verifyForm.addEventListener("submit", handleVerification);
}
