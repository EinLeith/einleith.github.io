document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const csvData = event.target.result;
            const formattedText = convertCSVToText(csvData);
            document.getElementById('formatted-text').textContent = formattedText;
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a CSV file.');
    }
});

function convertCSVToText(csvData) {
    const rows = csvData.split('\n').map(row => row.trim()).filter(row => row.length > 0);
    const headers = rows[0].split(',').map(header => header.trim());
    let text = headers.join('\t') + '\n';

    rows.slice(1).forEach(row => {
        const columns = row.split(',').map(column => column.trim());
        text += columns.join('\t') + '\n';
    });

    return text;
}