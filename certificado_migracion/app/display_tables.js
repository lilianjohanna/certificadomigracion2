let newHeaders= ['Subject', 'Mark', 'Subject Type', 'Course']

function displayOne (r, elem) {

    document.getElementById('studentData').setAttribute("style", "display: block;")
    document.getElementById('verifyTable').setAttribute("style", "display: block;")
    document.getElementById('btnDownload').setAttribute("style", "display: block;")

    let myTable = document.querySelector('#' + elem);

    while (myTable.firstChild) {
        myTable.removeChild(myTable.firstChild);
    }

    let p = document.createElement("p");
    p.appendChild(document.createElement("br"));

    let pText = document.createTextNode("Transaction Hash: " + r.txHash);
    p.appendChild(pText);
    p.appendChild(document.createElement("br"));

    let pText2 = document.createTextNode("Public Key: " + r.pubk);
    p.appendChild(pText2);
    p.appendChild(document.createElement("br"));

    let pText3 = document.createTextNode("Degree: " + r.degree);
    p.appendChild(pText3);
    p.appendChild(document.createElement("br"));

    let pText4 = document.createTextNode("Academic title issue date: " + r.titleExpeditionDate);
    p.appendChild(pText4);
    p.appendChild(document.createElement("br"));

    let pText5 = document.createTextNode("Name: " + r.firstName);
    p.appendChild(pText5);
    p.appendChild(document.createElement("br"));

    let pText6 = document.createTextNode("Surname: " + r.firstSurname);
    p.appendChild(pText6);
    p.appendChild(document.createElement("br"));

    myTable.appendChild(p)

    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    newHeaders.forEach(headerText => {
        // 3
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
        r.subjects.forEach(emp => {
            let row = document.createElement('tr');
            Object.values(emp).forEach(text => {
                let cell = document.createElement('td');
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
                row.appendChild(cell);
            })
            table.appendChild(row);
        });
        table.setAttribute("border", "1");
        myTable.appendChild(table);
}


function display (records, elem) {
    
    let myTable = document.querySelector('#' + elem);

    while (myTable.firstChild) {
        myTable.removeChild(myTable.firstChild);
    }

    records.forEach(r => {

        let p = document.createElement("p");

        let pText = document.createTextNode("Transaction Hash: " + r.txHash);
        p.appendChild(pText);
        p.appendChild(document.createElement("br"));

        let pText2 = document.createTextNode("Public key: " + r.pubk);
        p.appendChild(pText2);
        p.appendChild(document.createElement("br"));

        let pText3 = document.createTextNode("Degree: " + r.degree);
        p.appendChild(pText3);
        p.appendChild(document.createElement("br"));

        let pText4 = document.createTextNode("Academic title issue date: " + r.titleExpeditionDate);
        p.appendChild(pText4);
        p.appendChild(document.createElement("br"));

        let pText5 = document.createTextNode("Name: " + r.firstName);
        p.appendChild(pText5);
        p.appendChild(document.createElement("br"));

        let pText6 = document.createTextNode("Surname: " + r.firstSurname);
        p.appendChild(pText6);
        p.appendChild(document.createElement("br"));

        myTable.appendChild(p)

        let table = document.createElement('table');
        let headerRow = document.createElement('tr');
        newHeaders.forEach(headerText => {
            // 3
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);
        // different table for each one
            // 2
            r.subjects.forEach(emp => {
                // 4
                let row = document.createElement('tr');
                Object.values(emp).forEach(text => {
                    // 3
                    let cell = document.createElement('td');
                    let textNode = document.createTextNode(text);
                    cell.appendChild(textNode);
                    row.appendChild(cell);
                })
                table.appendChild(row);
            });
            table.setAttribute("border", "1");
            myTable.appendChild(table);
    });

}