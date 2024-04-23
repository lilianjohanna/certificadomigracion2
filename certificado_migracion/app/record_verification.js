let form = document.querySelector('#upload');
let file = document.querySelector('#file');
let app = document.querySelector('#app');


 function logFile (event) {
	let str = event.target.result;
	let json = JSON.parse(str);
    let recordString = JSON.stringify(json);
    var jsonHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(recordString));

    ctc.checkRecord(jsonHash).then(async (result) => {
        if(result) {
            document.getElementById("checkRecordResult").innerHTML = "♦ The introduced academic record is valid.";
        } else {
            document.getElementById("checkRecordResult").innerHTML = "♦ There is not any coincidence in the blockchain.";
        }
    })
}

function handleSubmit (event) {

    event.preventDefault();
    if (!file.value.length) return;
	let reader = new FileReader();
	reader.onload = logFile;
	reader.readAsText(file.files[0]);
}

form.addEventListener('submit', handleSubmit);