const fs = require('fs');
const puppeteer = require('puppeteer');

async function generatePDF(certificateData) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Certificado</title>
            <style>
                body {
                    font-family: sans-serif;
                }

                .certificate {
                    width: 800px;
                    height: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                }

                .header {
                    text-align: center;
                }

                .name {
                    font-size: 24px;
                    font-weight: bold;
                }

                .course {
                    font-size: 18px;
                }

                .institution {
                    font-size: 16px;
                }

                .date {
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="header">
                    <h1>Certificado</h1>
                </div>

                <p class="name">${certificateData.name}</p>
                <p class="course">Ha completado el curso "${certificateData.course}"</p>
                <p class="institution">Otorgado por "${certificateData.institution}"</p>
                <p class="date">Fecha: ${certificateData.date}</p>
            </div>
        </body>
        </html>
    `;

    await page.setContent(html);
    await page.waitForSelector('.certificate');

    const pdfBuffer = await page.pdf({ format: 'A4', landscape: false });
    await browser.close();

    return pdfBuffer;
}