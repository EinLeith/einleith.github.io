document.addEventListener("DOMContentLoaded", function () {
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

    document.getElementById('paste-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const excelData = document.getElementById('excelData').value;
        const formattedText = convertPastedDataToMarkdownTable(excelData);
        document.getElementById('formatted-text').textContent = formattedText;
    });

    function convertToMarkdownTable(data) {
        let text = '';

        if (data.length > 0) {
            const headers = data[0];
            const headerRow = '| ' + headers.join(' | ') + ' |\n';
            const separatorRow = '| ' + headers.map(() => '---').join(' | ') + ' |\n';
            text += headerRow + separatorRow;

            for (let i = 1; i < data.length; i++) {
                if (data[i].length) {
                    text += '| ' + data[i].join(' | ') + ' |\n';
                }
            }
        }

        return text;
    }

    function convertPastedDataToMarkdownTable(data) {
        const rows = data.trim().split('\n');
        const formattedRows = rows.map(row => '| ' + row.split('\t').join(' | ') + ' |');
        const headers = formattedRows[0];
        const separatorRow = '| ' + headers.split(' | ').map(() => '---').join(' | ') + ' |';
        formattedRows.splice(1, 0, separatorRow);
        return formattedRows.join('\n');
    }

    document.getElementById('copy-button').addEventListener('click', function () {
        const formattedText = document.getElementById('formatted-text').textContent;
        navigator.clipboard.writeText(formattedText).then(function () {
            alert('Text copied to clipboard');
        }, function (err) {
            console.error('Could not copy text: ', err);
        });
    });
});
