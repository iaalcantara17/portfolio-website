const phrases = [
  "Hello, my name is Israel Alcántara.",
  "I am a student and a software engineer.",
  "I am passionate about technology and exploring new opportunities."
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
const typingSpeed = 100;
const pauseBetweenLoops = 2000;
const element = document.getElementById('intro-text');

function typeFirstPhrase() {
  const firstPhrase = phrases[0];

  if (currentCharIndex <= firstPhrase.length) {
    element.textContent = firstPhrase.slice(0, currentCharIndex);
    currentCharIndex++;
    setTimeout(typeFirstPhrase, typingSpeed);
  } else {
    currentCharIndex = 0;
    currentPhraseIndex = 1;
    setTimeout(typeAndReplace, pauseBetweenLoops);
  }
}

function typeAndReplace() {
  const currentPhrase = phrases[currentPhraseIndex];
  const nextPhrase = phrases[(currentPhraseIndex + 1) % phrases.length];
  
  let displayText = "";

  for (let i = 0; i < currentCharIndex; i++) {
    if (i < nextPhrase.length) {
      displayText += nextPhrase.charAt(i);
    }
  }

  if (currentCharIndex < currentPhrase.length) {
    displayText += currentPhrase.slice(currentCharIndex);
  }

  element.textContent = displayText;

  if (currentCharIndex < Math.max(currentPhrase.length, nextPhrase.length)) {
    currentCharIndex++;
    setTimeout(typeAndReplace, typingSpeed);
  } else {
    currentCharIndex = 0;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    setTimeout(typeAndReplace, pauseBetweenLoops);
  }
}

window.onload = () => {
  setTimeout(typeFirstPhrase, 1000);
};

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let fontSize = 24;
let columns;
let drops;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = new Array(columns).fill(1);
}

function drawMatrixRain() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00FF00';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const matrixLetters = letters.split('');

resizeCanvas();
setInterval(drawMatrixRain, 40);

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 100);
});

const modal = document.getElementById('fortran-modal');
const modalClose = document.querySelector('.close');
const fortranImage = document.querySelector('.rectangular-icon');

fortranImage.addEventListener('click', () => {
  modal.classList.add('show');
  modal.classList.remove('hide');
  modal.style.display = 'block';
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hide');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hide');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
});


(function() {
  emailjs.init("YOUR_USER_ID");
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const params = {
    name: name,
    email: email,
    message: message
  };

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params)
    .then(function(response) {
      document.getElementById('status-message').innerHTML = `<div class="alert alert-success">Your message was sent successfully!</div>`;
      document.getElementById('contact-form').reset();  // Clear the form
    }, function(error) {
      document.getElementById('status-message').innerHTML = `<div class="alert alert-danger">There was an error sending your message. Please try again later.</div>`;
    });
});
