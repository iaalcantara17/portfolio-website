// NEW TYPEWRITER EFFECT WITH DELETION (for main intro, if still used)
const phrases = [
  "Hello, my name is Israel Alcántara.",
  "I am a student and a software engineer.",
  "I am passionate about technology and exploring new opportunities."
];
const typingSpeed = 100;       // Base milliseconds per character
const pauseBetweenLoops = 2000; // Pause at end of phrase
const element = document.getElementById('intro-text');

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

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*~+=?';
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

const rhythmiqModal = document.getElementById('rhythmiq-modal');
const rhythmiqClose = document.getElementById('rhythmiq-close');
const rhythmiqIcon = document.getElementById('rhythmiq-icon');

rhythmiqIcon.addEventListener('click', () => {
  rhythmiqModal.classList.add('show');
  rhythmiqModal.classList.remove('hide');
  rhythmiqModal.style.display = 'block';
});

rhythmiqClose.addEventListener('click', () => {
  rhythmiqModal.classList.add('hide');
  rhythmiqModal.classList.remove('show');
  setTimeout(() => {
    rhythmiqModal.style.display = 'none';
  }, 300);
});

window.addEventListener('click', (event) => {
  if (event.target === rhythmiqModal) {
    rhythmiqModal.classList.add('hide');
    rhythmiqModal.classList.remove('show');
    setTimeout(() => {
      rhythmiqModal.style.display = 'none';
    }, 300);
  }
});

// --- Custom Splash Animation Code ---
window.addEventListener('load', function() {
  console.log("Custom splash animation starting...");
  
  // Function to split text into spans for the reveal effect
  function revealText(selector) {
    document.querySelectorAll(selector).forEach(function(elem) {
      let originalText = elem.textContent.trim();
      elem.textContent = '';
      let parentSpan = document.createElement('span');
      parentSpan.classList.add('parent');
      originalText.split('').forEach(function(char) {
        let childSpan = document.createElement('span');
        childSpan.classList.add('child');
        childSpan.textContent = char;
        parentSpan.appendChild(childSpan);
      });
      elem.appendChild(parentSpan);
    });
  }
  
  // Apply the reveal effect to the temporary text
  revealText('.splash-temp h1');
  
  // Create the GSAP timeline for the splash animations
  const splashTl = gsap.timeline({ delay: 0.5 });
  
  // Animate the temporary text in
  splashTl.to('.splash-temp .child', {
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: "power3.out",
    stagger: 0.05
  });
  
  // Hold the temporary text briefly
  splashTl.to('.splash-temp', {
    duration: 1,
    opacity: 1
  });
  
  // Animate the temporary text out (slide up and fade)
  splashTl.to('.splash-temp', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power2.inOut"
  });
  
  // Fade in the AWS splash container
  splashTl.to('.splash-aws', {
    duration: 0.5,
    opacity: 1,
    onComplete: function() {
      // Use the irregular typewriter effect to type the AWS text
      overwriteTransitionIrregular(
         document.getElementById('aws-splash-text'),
         "", // starting empty
         "Software Development Engineer Intern",
         typingSpeed, // base speed
         function() {
           // After typing completes, wait and then fade out the entire splash
           setTimeout(function(){
             gsap.to('#custom-splash', {
               duration: 0.5,
               opacity: 0,
               onComplete: function() {
                 document.getElementById('custom-splash').style.display = 'none';
                 console.log("Splash screen removed");
                 // Now start the main intro typewriter effect
                 startTyping(phrases, element, typingSpeed, pauseBetweenLoops);
               }
             });
           }, 1000);
         }
      );
    }
  });
});

// --- Consolidated Overwrite Transition Function ---
// (Remove the duplicate definitions—keep only one clean version)
function overwriteTransitionIrregular(element, oldText, newText, baseSpeed, callback) {
  let currentText = oldText;
  const commonLength = Math.min(oldText.length, newText.length);
  let i = 0;
  
  function getDelay() {
    return baseSpeed * (0.5 + Math.random());
  }
  
  function overwritePhase() {
    if (i < commonLength) {
      currentText = currentText.substring(0, i) + newText[i] + currentText.substring(i + 1);
      element.textContent = currentText;
      i++;
      setTimeout(overwritePhase, getDelay());
    } else {
      if (newText.length > oldText.length) {
        appendPhase(i);
      } else if (oldText.length > newText.length) {
        deletePhase();
      } else {
        element.textContent = newText;
        if (callback) callback();
      }
    }
  }
  
  function appendPhase(j) {
    if (j < newText.length) {
      currentText += newText[j];
      element.textContent = currentText;
      j++;
      setTimeout(() => appendPhase(j), getDelay());
    } else {
      if (callback) callback();
    }
  }
  
  // Simplified deletion: remove one character from the end until lengths match.
  function deletePhase() {
    if (currentText.length > newText.length) {
      currentText = currentText.substring(0, newText.length) + currentText.substring(newText.length + 1);
      element.textContent = currentText;
      setTimeout(deletePhase, getDelay());
    } else {
      if (callback) callback();
    }
  }
  
  overwritePhase();
}

// --- StartTyping Function for Main Intro ---
function startTyping(phrases, element, baseSpeed, pause) {
  element.style.opacity = '1';
  
  let index = 0;
  function next() {
    const currentPhrase = phrases[index];
    const prevText = element.textContent || "";
    overwriteTransitionIrregular(element, prevText, currentPhrase, baseSpeed, function() {
      setTimeout(() => {
        index = (index + 1) % phrases.length;
        next();
      }, pause);
    });
  }
  next();
}

const dataAnalysisIcon = document.getElementById('data-analysis-icon');
const dataAnalysisModal = document.getElementById('data-analysis-modal');
const dataAnalysisClose = document.getElementById('data-analysis-close');

dataAnalysisIcon.addEventListener('click', () => {
  dataAnalysisModal.classList.add('show');
  dataAnalysisModal.classList.remove('hide');
  dataAnalysisModal.style.display = 'block';
});

dataAnalysisClose.addEventListener('click', () => {
  dataAnalysisModal.classList.add('hide');
  dataAnalysisModal.classList.remove('show');
  setTimeout(() => {
    dataAnalysisModal.style.display = 'none';
  }, 300);
});

window.addEventListener('click', (event) => {
  if (event.target === dataAnalysisModal) {
    dataAnalysisModal.classList.add('hide');
    dataAnalysisModal.classList.remove('show');
    setTimeout(() => {
      dataAnalysisModal.style.display = 'none';
    }, 300);
  }
});
