document.addEventListener('DOMContentLoaded', function() {
    const alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'i', 'f', 'j', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    const halfLength = 26;
    function displayAlphabets() {
        const normalAlphabet = [];
        const encryptedAlphabet = [];
        
        for (let i = 0; i < halfLength; i++) {
            normalAlphabet.push(alphabet[i]);
            encryptedAlphabet.push(alphabet[(i + 13) % halfLength]);
        }
        
    }
    displayAlphabets();
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');    
    const processText = () => {
        const text = inputText.value;
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            let found = false;
            
            for (let j = 0; j < alphabet.length; j++) {
                if (char === alphabet[j]) {
                    const caseOffset = j >= halfLength ? halfLength : 0;
                    const newPos = (j - caseOffset + 13) % halfLength + caseOffset;
                    result += alphabet[newPos];
                    found = true;
                    break;
                }
            }
            if (!found) result += char;
        }
        outputText.textContent = result;
    };
    document.getElementById('encryptBtn').addEventListener('click', processText);
});