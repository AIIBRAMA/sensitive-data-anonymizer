document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const anonymizeBtn = document.getElementById('anonymize-btn');
    const copyBtn = document.getElementById('copy-btn');
    
    const emailCheckbox = document.getElementById('anonymize-emails');
    const namesCheckbox = document.getElementById('anonymize-names');
    const codesCheckbox = document.getElementById('anonymize-codes');

    // Anonimizācijas funkcija
    function anonymizeData(text) {
        let result = text;

        // Anonimizēt e-pastus
        if (emailCheckbox.checked) {
            result = result.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[e-pasts]');
        }

        // Anonimizēt vārdus
        if (namesCheckbox.checked) {
            result = result.replace(/\b[A-ZĀČĒĢĪĶĻŅRŠŪŽ][a-zāčēģīķļņršūž]+ [A-ZĀČĒĢĪĶĻŅRŠŪŽ][a-zāčēģīķļņršūž]+\b/g, '[vārds uzvārds]');
        }

        // Anonimizēt personas kodus
        if (codesCheckbox.checked) {
            result = result.replace(/\b\d{6}-\d{5}\b/g, '[personas kods]');
        }

        return result;
    }

    // Anonimizācijas pogas darbība
    anonymizeBtn.addEventListener('click', () => {
        if (inputText.value.trim() === '') {
            alert('Lūdzu, ievadiet tekstu');
            return;
        }

        const anonymizedText = anonymizeData(inputText.value);
        outputText.value = anonymizedText;
        copyBtn.disabled = false;
    });

    // Kopēšanas pogas darbība
    copyBtn.addEventListener('click', () => {
        outputText.select();
        document.execCommand('copy');
        alert('Teksts nokopēts');
    });

    // Tukšošanas funkcionalitāte
    inputText.addEventListener('input', () => {
        if (inputText.value.trim() === '') {
            outputText.value = '';
            copyBtn.disabled = true;
        }
    });
});
