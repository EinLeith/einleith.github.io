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
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });
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
    const textArea = document.createElement("textarea");
    textArea.value = formattedText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert('Text copied to clipboard');
});