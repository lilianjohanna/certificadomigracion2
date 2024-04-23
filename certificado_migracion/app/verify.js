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
    document.getElementById('validSignature').innerHTML = "♦ Correct sign. Checking key existence... <br/>";

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    const record = NPP.getRecordByPubk(account);

    if (record == undefined) {
      document.getElementById('validSignature').innerHTML = "♦ Your public key does not match with any academic record. <br/>";
      return;
    }

    document.getElementById('validSignature').innerHTML = "♦ Detected record in the university database. <br/>";

    if (record.role == "1" ) {
      sessionStorage.setItem('activeUserRole', record.role);

      if (record.txHash == ""){
        document.getElementById('recordExists').innerHTML = "♦ Academic record not traced by the blockchain. You have to wait for the approval. Come back later.<br/>";
      } else {
        console.log("♦ Academic record ID not null, requesting information...");
        displayPaneToUser(record);
      }
    
    } else if (record.role == "2" ) {
      sessionStorage.setItem('activeUserRole', record.role);
      displayPaneToUser();
    }

  } else {
    document.getElementById('validSignature').innerHTML = "♦ Invalid signature, please try again.";
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
