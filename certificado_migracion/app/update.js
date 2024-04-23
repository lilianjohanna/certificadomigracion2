let pendingHashes, pendingRecords;

async function acceptChanges (e) {
    e.preventDefault();
    for (let i = 0 ; i < pendingHashes.length; i++ ){
        const storeValueTx = await storeRecord(pendingHashes[i]);
        NPP.updateRecordTxHashByPubk(pendingRecords[i].pubk, storeValueTx);
    }
    pendingHashes = [];

}

async function makeChanges(e) {
    e.preventDefault();
    PROVIDER.listAccounts().then(response => {
        for (let i = 0; i < response.length; i++){
            NPP.updateSubjectMark(response[i], "Linear Algebra", toString(getRandomMark()));
            NPP.updateSubjectMark(response[i], "Physics", toString(getRandomMark()));
            NPP.updateSubjectMark(response[i], "Statistics", toString(getRandomMark()));
            NPP.updateSubjectMark(response[i], "Programming II", toString(getRandomMark()));
            NPP.updateSubjectMark(response[i], "Principles of Computer Engineering", toString(getRandomMark()));
        }
    })
}

async function setUpdatedRecords (event) {
    event.preventDefault();
    const records = NPP.getAllRecords();

    let updateForm = document.getElementById("updateForm");
  
    let oldButton = document.getElementById("btnAcceptChanges");
    if (oldButton != undefined) {
        oldButton.remove();
    }

    pendingHashes = [];
    pendingRecords = [];
        
    // they were introduced in the blockchain.
    for(let i = 0; i < records.length; i++) {

        if (records[i].role != "2"){
            if (records[i].txHash != "") {
                
                // store current value
                let backup = records[i].txHash;
                // remove transaction hash
                records[i].txHash = "";
                // hash record
                let recordString = JSON.stringify(records[i]);
                recordHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(recordString));
                // check that if present
                let present = await ctc.checkRecord(recordHash);

                if (!present) {
                    // if present: record has not been changed so it does not store
                    // if not present: overwrite record's hash with the new one
                    pendingRecords.push(records[i]);
                    pendingHashes.push(recordHash);
                }
                records[i].txHash = backup;

            } else {
                let recordString = JSON.stringify(records[i]);
                recordHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(recordString));
                // check that if present
                let present = await ctc.checkRecord(recordHash);

                if (!present) {
                    // if present: record has not been changed so it does not store
                    // if not present: overwrite record's hash with the new one
                    pendingRecords.push(records[i]);
                    pendingHashes.push(recordHash);
                }
            }
        }
    }

    if (pendingHashes.length == 0){
        document.getElementById("updateResult").innerHTML = "<br/> All records updated.";
    } else {
        document.getElementById("updateResult").innerHTML = "<br/>♦ " + pendingHashes.length + " AR(s) have changed. You need to confirm these changes.";
    }

    display(pendingRecords, "updatesTable");
    
    let br1 = document.createElement("br");
    updateForm.append(br1);

    let br2 = document.createElement("br");
    updateForm.append(br2);

    if (pendingHashes.length > 0) {
        let button = document.createElement("button");
        button.innerHTML = "Confirm";
        button.setAttribute("id", "btnAcceptChanges");
        button.addEventListener("click", acceptChanges);
        updateForm.append(button);
    }

}

const btnSetChanges = document.getElementById("btnSetChanges");

if (btnSetChanges) {
    btnSetChanges.addEventListener("click", setUpdatedRecords);
}

const btnAcceptChanges = document.getElementById("btnAcceptChanges");

if (btnAcceptChanges) {
    btnAcceptChanges.addEventListener("click", acceptChanges);
}

const btnMakeChanges = document.getElementById("btnMakeChanges");

if (btnMakeChanges) {
    btnMakeChanges.addEventListener("click", makeChanges);
}