async function storeRecord(dataHash) {

    try {
        document.getElementById('loading').setAttribute("style", "display: block;");
        let storeValue = await ctc.storeRecord(dataHash); //{from: account});
        await storeValue.wait();
        console.log(storeValue);
        document.getElementById('loading').setAttribute("style", "display: none;");
        document.getElementById('recordInserted').innerHTML = "♦ El certificado fue almacenado satisfactoriamente. <br/>";
        return storeValue.hash;

    } catch (error) {
        document.getElementById('loading').setAttribute("style", "display: none;");
        document.getElementById('recordInserted').innerHTML = "♦ El certificado no pudo ser almacenado. <br/>";
        console.log(error);
    }
}
