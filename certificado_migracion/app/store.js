async function storeRecord(dataHash) {

    try {
        document.getElementById('loading').setAttribute("style", "display: block;");
        let storeValue = await ctc.storeRecord(dataHash); //{from: account});
        await storeValue.wait();
        console.log(storeValue);
        document.getElementById('loading').setAttribute("style", "display: none;");
        document.getElementById('recordInserted').innerHTML = "♦ The academic record was stored succesfully. <br/>";
        return storeValue.hash;

    } catch (error) {
        document.getElementById('loading').setAttribute("style", "display: none;");
        document.getElementById('recordInserted').innerHTML = "♦ The academic record could not be stored. <br/>";
        console.log(error);
    }
}
