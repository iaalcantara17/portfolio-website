const phrases = 
[
  "Hello, my name is Israel Alcántara.",
  "I am a student and a software engineer.",
  "I am passionate about technology and exploring new opportunities."
];
const typingSpeed = 100;
const pauseBetweenLoops = 2000;
const element = document.getElementById('intro-text');

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let fontSize = 24;
let columns;
let drops;

function resizeCanvas() 
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = new Array(columns).fill(1);
}

function drawMatrixRain() 
{
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00FF00';
  ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) 
  {
    const text = matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) 
    {
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
window.addEventListener('resize', () => 
{
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 100);
});

const modal = document.getElementById('fortran-modal');
const modalClose = document.querySelector('.close');
const fortranImage = document.querySelector('.rectangular-icon');

fortranImage.addEventListener('click', () => 
{
  modal.classList.add('show');
  modal.classList.remove('hide');
  modal.style.display = 'block';
});

modalClose.addEventListener('click', () => 
{
  modal.classList.add('hide');
  modal.classList.remove('show');
  setTimeout(() => 
  {
    modal.style.display = 'none';
  }, 300);
});

window.addEventListener('click', (event) => 
{
  if (event.target === modal) 
  {
    modal.classList.add('hide');
    modal.classList.remove('show');
    setTimeout(() => 
    {
      modal.style.display = 'none';
    }, 300);
  }
});

const rhythmiqModal = document.getElementById('rhythmiq-modal');
const rhythmiqClose = document.getElementById('rhythmiq-close');
const rhythmiqIcon = document.getElementById('rhythmiq-icon');

rhythmiqIcon.addEventListener('click', () => 
{
  rhythmiqModal.classList.add('show');
  rhythmiqModal.classList.remove('hide');
  rhythmiqModal.style.display = 'block';
});

rhythmiqClose.addEventListener('click', () => 
{
  rhythmiqModal.classList.add('hide');
  rhythmiqModal.classList.remove('show');
  setTimeout(() => 
  {
    rhythmiqModal.style.display = 'none';
  }, 300);
});

window.addEventListener('click', (event) => 
{
  if (event.target === rhythmiqModal) 
  {
    rhythmiqModal.classList.add('hide');
    rhythmiqModal.classList.remove('show');
    setTimeout(() => 
    {
      rhythmiqModal.style.display = 'none';
    }, 300);
  }
});

window.addEventListener('load', function() 
{
  console.log("Custom splash animation starting...");
  
  function revealText(selector) 
{
  document.querySelectorAll(selector).forEach(function(elem) 
  {
    let originalText = elem.textContent.trim();
    elem.textContent = '';

    let words = originalText.split(' ');

    words.forEach((word, wIdx) => 
    {
      let wordSpan = document.createElement('span');
      wordSpan.classList.add('word-container');
      
      word.split('').forEach(char => 
      {
        let childSpan = document.createElement('span');
        childSpan.classList.add('child');
        childSpan.textContent = char;
        wordSpan.appendChild(childSpan);
      });

      if (wIdx < words.length - 1) 
      {
        let spaceSpan = document.createElement('span');
        spaceSpan.textContent = ' ';
        wordSpan.appendChild(spaceSpan);
      }

      elem.appendChild(wordSpan);
    });
  });
}

  revealText('.splash-temp h1');
  
  const splashTl = gsap.timeline({ delay: 0.5 });
  
  splashTl.to('.splash-temp .child', 
  {
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: "power3.out",
    stagger: 0.05
  });
  
  splashTl.to('.splash-temp', 
  {
    duration: 1,
    opacity: 1
  });
  
  splashTl.to('.splash-temp', 
  {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power2.inOut"
  });
  
  splashTl.to('.splash-aws', 
  {
    duration: 0.5,
    opacity: 1,
    onComplete: function() 
    {
      overwriteTransitionIrregular
      (
        document.getElementById('aws-splash-text'),
        "",
        "Software Development Engineer Intern",
        typingSpeed,
        function() 
        {
          setTimeout(function() 
          {
            gsap.to('#custom-splash', 
            {
              duration: 0.5,
              opacity: 0,
              onComplete: function() 
              {
                document.getElementById('custom-splash').style.display = 'none';
                console.log("Splash screen removed");
                startTyping(phrases, element, typingSpeed, pauseBetweenLoops);
              }
            });
          }, 1000);
        }
      );
    }
  });
});

function overwriteTransitionIrregular(element, oldText, newText, baseSpeed, callback) 
{
  let currentText = oldText;
  const commonLength = Math.min(oldText.length, newText.length);
  let i = 0;
  
  function getDelay() 
  {
    return baseSpeed * (0.5 + Math.random());
  }
  
  function overwritePhase() 
  {
    if (i < commonLength) 
    {
      currentText = currentText.substring(0, i) + newText[i] + currentText.substring(i + 1);
      element.textContent = currentText;
      i++;
      setTimeout(overwritePhase, getDelay());
    } 
    else 
    {
      if (newText.length > oldText.length) 
      {
        appendPhase(i);
      } 
      else if (oldText.length > newText.length) 
      {
        deletePhase();
      } 
      else 
      {
        element.textContent = newText;
        if (callback) callback();
      }
    }
  }
  
  function appendPhase(j) 
  {
    if (j < newText.length) 
    {
      currentText += newText[j];
      element.textContent = currentText;
      j++;
      setTimeout(() => appendPhase(j), getDelay());
    } 
    else 
    {
      if (callback) callback();
    }
  }
  
  function deletePhase() 
  {
    if (currentText.length > newText.length) 
    {
      currentText = currentText.substring(0, newText.length) + currentText.substring(newText.length + 1);
      element.textContent = currentText;
      setTimeout(deletePhase, getDelay());
    } 
    else 
    {
      if (callback) callback();
    }
  }
  
  overwritePhase();
}

function startTyping(phrases, element, baseSpeed, pause) 
{
  element.style.opacity = '1';
  
  let index = 0;
  function next() 
  {
    const currentPhrase = phrases[index];
    const prevText = element.textContent || "";
    overwriteTransitionIrregular(element, prevText, currentPhrase, baseSpeed, function() 
    {
      setTimeout(() => 
      {
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

dataAnalysisIcon.addEventListener('click', () => 
{
  dataAnalysisModal.classList.add('show');
  dataAnalysisModal.classList.remove('hide');
  dataAnalysisModal.style.display = 'block';
});

dataAnalysisClose.addEventListener('click', () => 
{
  dataAnalysisModal.classList.add('hide');
  dataAnalysisModal.classList.remove('show');
  setTimeout(() => 
  {
    dataAnalysisModal.style.display = 'none';
  }, 300);
});

window.addEventListener('click', (event) => 
{
  if (event.target === dataAnalysisModal) 
  {
    dataAnalysisModal.classList.add('hide');
    dataAnalysisModal.classList.remove('show');
    setTimeout(() => 
    {
      dataAnalysisModal.style.display = 'none';
    }, 300);
  }
});

function closeModal(modal) {
  modal.classList.add('hide');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    closeModal(event.target);
  }
});

modalClose.addEventListener('click', () => closeModal(modal));
rhythmiqClose.addEventListener('click', () => closeModal(rhythmiqModal));
dataAnalysisClose.addEventListener('click', () => closeModal(dataAnalysisModal));