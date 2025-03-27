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
            const csvData = XLSX.utils.sheet_to_csv(worksheet);
            const formattedText = convertCSVToText(csvData);
            document.getElementById('formatted-text').textContent = formattedText;
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please upload an XLSX file.');
    }
});

function convertCSVToText(csvData) {
    const rows = csvData.split('\n').map(row => row.trim()).filter(row => row.length > 0);
    const headers = rows[0].split(',').map(header => header.trim());
    let text = '| ' + headers.join(' | ') + ' |\n';
    text += '|' + headers.map(() => '---').join('|') + '|\n';

    rows.slice(1).forEach(row => {
        const columns = row.split(',').map(column => column.trim());
        text += '| ' + columns.join(' | ') + ' |\n';
    });

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