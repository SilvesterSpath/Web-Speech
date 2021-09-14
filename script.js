const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `<img src="${image}" alt="${text}">
  <p class="info">${text}</p>`;

  // @todo - speak event
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speach synth
const message = new SpeechSynthesisUtterance();

// Set text message
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  console.log(voices);

  voices.forEach((i) => {
    const option = document.createElement('option');

    option.value = i.name;
    option.innerText = `${i.name} ${i.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle textbox
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.add('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Set voice
function setVoice(e) {
  message.voice = voices.find((i) => i.name === e.target.value);
}

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text
function readText() {
  const text = textArea.value;
  setTextMessage(text);
  speakText();
}

// Read text button
readBtn.addEventListener('click', readText);

getVoices();
