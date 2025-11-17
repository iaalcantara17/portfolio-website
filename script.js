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

if ('scrollRestoration' in history) 
{
  history.scrollRestoration = 'manual';
}
window.addEventListener('beforeunload', () => 
{
  window.scrollTo(0, 0);
});

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

if (canvas && ctx) {
  resizeCanvas();
  setInterval(drawMatrixRain, 40);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 100);
  });
} else {
  console.warn('matrix canvas not found; skipping rain setup');
}

const modal = document.getElementById('fortran-modal');
const modalClose = document.querySelector('.close');
const fortranImage = document.getElementById('fortran-icon');

if (fortranImage && modal && modalClose) {
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
} else {
  console.warn('Fortran modal elements missing; listeners not attached');
}

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
const awsExperienceIcon = document.getElementById('aws-experience-icon');
const awsExperienceModal = document.getElementById('aws-experience-modal');
const awsExperienceClose = document.getElementById('aws-experience-close');

if (dataAnalysisIcon && dataAnalysisModal && dataAnalysisClose) {
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
} else {
  console.warn('Data Analysis modal elements missing; listeners not attached');
}

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

if (modal && modalClose) { modalClose.addEventListener('click', () => closeModal(modal)); }
if (dataAnalysisModal && dataAnalysisClose) { dataAnalysisClose.addEventListener('click', () => closeModal(dataAnalysisModal)); }

// AWS Experience modal handlers
if (awsExperienceIcon && awsExperienceModal && awsExperienceClose) {
  awsExperienceIcon.addEventListener('click', () => {
    awsExperienceModal.classList.add('show');
    awsExperienceModal.classList.remove('hide');
    awsExperienceModal.style.display = 'block';
  });

  awsExperienceClose.addEventListener('click', () => {
    awsExperienceModal.classList.add('hide');
    awsExperienceModal.classList.remove('show');
    setTimeout(() => {
      awsExperienceModal.style.display = 'none';
    }, 300);
  });

  window.addEventListener('click', (event) => {
    if (event.target === awsExperienceModal) {
      awsExperienceModal.classList.add('hide');
      awsExperienceModal.classList.remove('show');
      setTimeout(() => {
        awsExperienceModal.style.display = 'none';
      }, 300);
    }
  });
} else {
  console.warn('AWS Experience modal elements missing; listeners not attached');
}

if (awsExperienceModal && awsExperienceClose) { awsExperienceClose.addEventListener('click', () => closeModal(awsExperienceModal)); }

window.addEventListener('load', () => {
  if (element) {
    startTyping(phrases, element, typingSpeed, pauseBetweenLoops);
  } else {
    console.warn('intro-text element not found; typing animation skipped');
  }
});
