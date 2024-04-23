function setFile(record) {
    backup = record.txHash;
    record.txHash="";
    var a = document.getElementById("btnDownload");
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(record, null, 4));
    a.setAttribute("href", "data:"+data);
    a.setAttribute("download", "data.json");    
    record.txHash= backup;
}