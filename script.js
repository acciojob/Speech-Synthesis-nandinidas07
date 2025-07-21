// Your script here.
const synth = window.speechSynthesis;

const textInput = document.querySelector('textarea');
const voiceSelect = document.querySelector('select');
const rateSlider = document.querySelector('input[name="rate"]');
const pitchSlider = document.querySelector('input[name="pitch"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

let voices = [];

// Load available voices
function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = voices
    .map(voice => <option value="${voice.name}">${voice.name} (${voice.lang})</option>)
    .join('');
}

// Set speech properties and speak
function speakText() {
  if (synth.speaking) synth.cancel();

  const text = textInput.value.trim();
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);

  const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
  if (selectedVoice) utterance.voice = selectedVoice;

  utterance.rate = parseFloat(rateSlider.value);
  utterance.pitch = parseFloat(pitchSlider.value);

  synth.speak(utterance);
}

// Stop speaking
function stopSpeaking() {
  synth.cancel();
}

// Event listeners
synth.addEventListener('voiceschanged', populateVoices);
voiceSelect.addEventListener('change', speakText);
rateSlider.addEventListener('input', () => {
  if (synth.speaking) speakText();
});
pitchSlider.addEventListener('input', () => {
  if (synth.speaking) speakText();
});
speakButton.addEventListener('click', speakText);
stopButton.addEventListener('click', stopSpeaking);

// Initial load
populateVoices();