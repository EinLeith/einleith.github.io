document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('xlsxFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const formattedText = convertToMarkdownTable(jsonData);
            document.getElementById('formatted-text').textContent = formattedText;
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please upload an XLSX file.');
    }
});

function convertToMarkdownTable(data) {
    let text = '';

    if (data.length > 0) {
        const headers = data[0];
        const headerRow = '| ' + headers.join(' | ') + ' |\n';
        const separatorRow = '| ' + headers.map(() => '---').join(' | ') + ' |\n';
        text += headerRow + separatorRow;

        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            text += '| ' + row.join(' | ') + ' |\n';
        }
    }

    return text;
}

document.getElementById('copy-button').addEventListener('click', function () {
    const formattedText = document.getElementById('formatted-text').textContent;
    navigator.clipboard.writeText(formattedText).then(() => {
        alert('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});
