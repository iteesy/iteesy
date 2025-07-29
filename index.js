message = "thanks for finding me?! ✿ ";
function step() {
  message = message.substr(1) + message.substr(0,1);
  document.title = message.substr(0,15);
}


//90s cursor effects by tholman
window.addEventListener("load", (event) => {
    new cursoreffects.fairyDustCursor({
      colors: ["#FF28EA", "#FFB7F0", "#FFDFF7"]
    });
  });


//BIO EFFECTS_____________________________
const addLineButton = document.querySelector(".addLineButton");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");
const line4 = document.querySelector(".line4");
const line5 = document.querySelector(".line5");
const line6 = document.querySelector(".line6");

let lineCount = 1; 

function createPopup(content, index) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="popup-header">
      <span class="close-btn">X</span>
    </div>
    <div class="popup-content">${content}</div>
  `;

  // random popup positions
  const bioText = document.querySelector('.bio-text');
  const rect = bioText.getBoundingClientRect();
  const button = document.querySelector('.addLineButton');
  const buttonRect = button.getBoundingClientRect();
  
  // calculate positions around the middle of the screen
  const middleY = window.innerHeight / 2;
  const maxX = rect.width - 300; // Account for popup width
  
  if (window.innerWidth >= 768) {
    // desktop: random position from left, centered vertically
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = middleY + (Math.random() * 200 - 100); // ±100px from middle
    popup.style.left = `${randomX}px`;
    popup.style.top = `${randomY}px`;
  } else {
    //mobile: position from left with adjusted vertical range
    const randomX = Math.floor(Math.random() * (maxX * 0.7)); // Reduce horizontal range on mobile
    const randomY = middleY + (Math.random() * 150 - 75); // ±75px from middle (smaller range for mobile)
    popup.style.left = `${randomX}px`;
    popup.style.top = `${randomY}px`;
    
    // adjust popup width for mobile
    popup.style.maxWidth = '250px';
  }

  // make popup draggable
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  // make entire popup draggable
  popup.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  function dragStart(e) {
    if (e.target !== popup.querySelector('.close-btn')) {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      isDragging = true;
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, popup);
    }
  }

  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }

  // close button 
  const closeBtn = popup.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    popup.remove();
  });

  bioText.appendChild(popup);
}

function addLine() {
  if (lineCount === 1) {
    createPopup("Reliving slow narratives of identity, girlhood, and temporality through a <a href='https://luckysoap.com/statements/handmadeweb.html' target='_blank'>handmade poetic web</a>. A homage to the internet's first generation of artists.", lineCount);
  } else if (lineCount === 2) {
    createPopup("Dreams of creating agency towards a loving internet. A reminder that there is a real human behind technology.", lineCount);
  } else if (lineCount === 3) {
    createPopup("Learned Human-Computer Interaction/AI at the University of California, Santa Cruz.<br><br>Unlearned at Engaging Education@UCSC.<br><br>Continued to unlearn at School for Poetic Computation, NYC.<br><br>Learned intensively at Creative Code Intensive @ Gray Area, SF.", lineCount);
  } else if (lineCount === 4) {
    createPopup("She must really love learning.", lineCount);
  } else if (lineCount === 5) {
    createPopup("She holds the softest spot in her heart for girls with an awkward, weird, or dorky backstory as she, too, was co-parented by the internet.", lineCount);
  } else if (lineCount === 6) {
    createPopup("She is hoping that you're enjoying this on a big screen.", lineCount);
  } else if (lineCount === 7) {
    createPopup("At this point, she is curious about you. What brings you here? What are you hoping to find?", lineCount);
  } else if (lineCount === 8) {
    createPopup("You clicked again but you didn't answer.", lineCount);
  } else if (lineCount === 9) {
    createPopup("Do you think pigeons have opinions about architecture like if they prefer brutalist buildings or-", lineCount);
  } else if (lineCount === 10) {
    createPopup('<img src="photos/me_hehe.png" id="me-hehe" /><p id="hi">Bye! See you in the next update.</p>', lineCount);
    addLineButton.remove();
  }
  lineCount++;
}

//MONITOR EFFECTS_____________________________
document.addEventListener('DOMContentLoaded', function() {
const monitorWrapper = document.querySelector('.monitor-wrapper');
const monitorImg = monitorWrapper.querySelector('.monitor-img');
const monitorScreen = monitorWrapper.querySelector('.monitor-screen');
const powerBtn = monitorWrapper.querySelector('.monitor-power-indicator');
const monitorGlitch = monitorWrapper.querySelector('.monitor-glitch');

let isOn = true;

function triggerGlitch() {
    monitorGlitch.classList.remove('active');
    monitorGlitch.offsetWidth; // Force reflow
    monitorGlitch.classList.add('active');
    setTimeout(() => {
    monitorGlitch.classList.remove('active');
    }, 350);
}

powerBtn.addEventListener('click', function() {
    isOn = !isOn;
    triggerGlitch();
    if (isOn) {
    monitorImg.src = 'photos/landing-monitor.png';
    monitorScreen.classList.remove('monitor-off');
    if (window.toggleMonitorScanlines) window.toggleMonitorScanlines(true);
    } else {
    monitorImg.src = 'photos/landing-monitor-off.png';
    monitorScreen.classList.add('monitor-off');
    if (window.toggleMonitorScanlines) window.toggleMonitorScanlines(false);
    }
    });
  });
  
// MONITOR HOVER EFFECTS_____________________________
const monitorScreen = document.querySelector('.monitor-screen');
const originalContent = monitorScreen.innerHTML;

let monitorVideo = null;
function playMonitorVideo(videoSrc) {
    monitorScreen.innerHTML = '';
    monitorScreen.style.background = 'radial-gradient(ellipse at center, rgba(80,180,255,0.10) 60%, rgba(0,0,0,0.18) 100%), #2233aa';
    monitorVideo = document.createElement('video');
    monitorVideo.src = videoSrc;
    monitorVideo.autoplay = true;
    monitorVideo.muted = true;
    monitorVideo.loop = true;
    monitorVideo.playsInline = true;
    monitorVideo.style.position = 'absolute';
    monitorVideo.style.top = '0';
    monitorVideo.style.left = '0';
    monitorVideo.style.width = '100%';
    monitorVideo.style.height = '100%';
    monitorVideo.style.objectFit = 'fill';
    monitorVideo.style.background = '#2233aa';
    monitorVideo.style.borderRadius = '8px';
    monitorVideo.style.zIndex = '2';
    monitorScreen.appendChild(monitorVideo);
    monitorVideo.play();
}
function stopMonitorVideo() {
    if (monitorVideo && monitorVideo.parentNode) monitorVideo.parentNode.removeChild(monitorVideo);
    monitorVideo = null;
    monitorScreen.innerHTML = originalContent;
    monitorScreen.style.background = 'radial-gradient(ellipse at center, rgba(80,180,255,0.10) 60%, rgba(0,0,0,0.18) 100%), #2233aa';
}

function showMonitorImage(imageSrc) {
    monitorScreen.innerHTML = '';
    monitorScreen.style.background = 'radial-gradient(ellipse at center, rgba(80,180,255,0.10) 60%, rgba(0,0,0,0.18) 100%), #2233aa';
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'fill';
    img.style.borderRadius = '8px';
    img.style.zIndex = '2';
    
    monitorScreen.appendChild(img);
}

function hideMonitorImage() {
    monitorScreen.innerHTML = originalContent;
    monitorScreen.style.background = 'radial-gradient(ellipse at center, rgba(80,180,255,0.10) 60%, rgba(0,0,0,0.18) 100%), #2233aa';
}

const sfpcDll = document.getElementById('sfpc-dll');
sfpcDll.addEventListener('mouseenter', () => {
    playMonitorVideo('videos/weonceexistedhere.mp4');
});
sfpcDll.addEventListener('mouseleave', stopMonitorVideo);


const uxSite = document.getElementById('ux-site');
uxSite.addEventListener('mouseenter', () => {
    playMonitorVideo('videos/uxuirish.mp4');
});
uxSite.addEventListener('mouseleave', stopMonitorVideo);

//uxuirish.xyz alert
uxSite.addEventListener("click", function (event) { 
    if (!confirm("🛑⛔️🫷🥺🫸 Stop! This website reflects my 9-5 self. Do you really want to see this side of me?")) {
        event.preventDefault(); // cancel button
    }
});

const cciShowcase = document.getElementById('cci-showcase');
if (cciShowcase) {
  cciShowcase.addEventListener('mouseenter', () => {
    playMonitorVideo('videos/cci.mp4');
  });
  cciShowcase.addEventListener('mouseleave', stopMonitorVideo);
}

const kiloMV = document.getElementById('kilo-mv');
if (kiloMV) {
  kiloMV.addEventListener('mouseenter', () => {
    playMonitorVideo('videos/kilo-crisis.mp4');
  });
  kiloMV.addEventListener('mouseleave', stopMonitorVideo);
}

const alay = document.getElementById('alay');
if (alay) {
  alay.addEventListener('mouseenter', () => {
    showMonitorImage('photos/alay4.jpeg'); 
  });
  alay.addEventListener('mouseleave', hideMonitorImage); 
}
