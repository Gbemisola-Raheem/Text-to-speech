const textInput = document.getElementById('text-input');
const voicesSelect = document.getElementById('voices-select');
const speakButton = document.getElementById('speak-button');
const downloadLink = document.getElementById('download-link');
let synth = window.speechSynthesis;

function populateVoices() {
    const voices = synth.getVoices();
    voicesSelect.innerHTML = "";
    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = `${voice.name} (${voice.lang})`;
        voicesSelect.appendChild(option);
    });
}

populateVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

speakButton.addEventListener('click', () => {
    const selectedVoiceIndex = voicesSelect.value;
    const voice = synth.getVoices()[selectedVoiceIndex];
    const text = textInput.value;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;

    synth.speak(utterance);

    utterance.onend = () => {
        const audioSrc = URL.createObjectURL(
            new Blob([new Uint8Array(0)], { type: 'audio/wav' })
        );
        downloadLink.href = audioSrc;
        downloadLink.style.display = 'inline-block';
    };
});
