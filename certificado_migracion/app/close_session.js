const closeSession = () => {

    document.getElementById('studentData').setAttribute("style", "display: none;")
    document.getElementById('verifyTable').setAttribute("style", "display: none;")
    document.getElementById('btnDownload').setAttribute("style", "display: none;")

    document.getElementById('validSignature').setAttribute("style", "display: none;")
    document.getElementById('recordExists').setAttribute("style", "display: none;")
    document.getElementById('recordInserted').setAttribute("style", "display: none;")

    document.getElementById('updateForm').setAttribute("style", "display: none;")
    document.getElementById('moreOptionsForm').setAttribute("style", "display: none;")

    var container = document.getElementById("verifyForm");
    var content = container.innerHTML;
    container.innerHTML= content;

    var container = document.getElementById("signForm");
    var content = container.innerHTML;
    container.innerHTML= content;

    document.getElementById('signFooter').setAttribute("style", "display: none;")

}

const btnClose = document.getElementById("btnClose");

if (btnClose) {
    btnClose.addEventListener("click", closeSession);
}