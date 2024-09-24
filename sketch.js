let inputBox;
let userInput = '';
let button;
let downloadIcon; 
let starIcon; 
let spellIcon; 
let fonts = [
  'Alex Brush', 
  'Babylonica', 
  'Ballet', 
  'Beau Rivage', 
  'Corinthia', 
  'Great Vibes', 
  'Hurricane', 
  'Luxurious Script', 
  'Ms Madi', 
  'Passions Conflict', 
  'Pinyon Script', 
  'Sassy Frass', 
  'WindSong',
  'Qwigley',
  'Fuggles',
  'Ruthie',
  'Lovers Quarrel',
];

let currentFontIndex = 0; 
let formatEnabled = true; 
let showText = false; 
let displayedText = ''; 
let typingIndex = 0;  
let instructionPanel;
let escKeyPressed = false;

function setup() {
  let myCanvas = createCanvas(600, 296);
  myCanvas.class('text-display-board');
  textAlign(CENTER, CENTER);
  
  currentFontIndex = floor(random(fonts.length));
  currentFont = fonts[currentFontIndex];
  
  inputBox = createInput();
  inputBox.class('input-box');
  inputBox.attribute('placeholder', 'Insert Your Name');
  
  spellIcon = select('.spell_icon');
  spellIcon.mousePressed(changeFont);
  
  starIcon = select('.star_icon');
  starIcon.mousePressed(toggleFormatting);
  
  downloadIcon = select('.download_icon');
  downloadIcon.mousePressed(downloadImage);
  
  updateDownloadIconState();
  
  instructionPanel = select('#instruction-panel');
  
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(event) {
  if (event.key === 'Escape' && !escKeyPressed) {
    escKeyPressed = true;
    instructionPanel.style('display', 'block'); 
  }
}

function handleKeyUp(event) {
  if (event.key === 'Escape' && escKeyPressed) {
    escKeyPressed = false;
    instructionPanel.style('display', 'none'); 
  }
}

function updateText() {
  if (formatEnabled) {
    const words = userInput.split(' '); 
    
    if (words.length > 1) {
      const firstLetter = words[0].charAt(0); 
      const remainingWords = words.slice(1).join(' '); 
      userInput = `${firstLetter}. ${remainingWords}`; 
    }
  }
  
  updateDownloadIconState();
}

function updateDownloadIconState() {
  if (userInput.length > 0) {
    downloadIcon.removeClass('disabled'); 
    downloadIcon.style('opacity', '1'); 
  } else {
    downloadIcon.addClass('disabled'); 
    downloadIcon.style('opacity', '0.5'); 
  }
}

function toggleFormatting() {
  formatEnabled = !formatEnabled; 
  
  if (formatEnabled) {
    starIcon.attribute('alt', 'Disable Formatting');
    starIcon.style('opacity', '1'); 
  } else {
    starIcon.attribute('alt', 'Enable Formatting'); 
    starIcon.style('opacity', '0.5'); 
    userInput = inputBox.value(); 
  }
  
  updateText(); 
  
  typingIndex = 0; 
  displayedText = '';  
  showText = true; 
  updateDownloadIconState();
}

function changeFont() {
  currentFontIndex = (currentFontIndex + 1) % fonts.length; 
  currentFont = fonts[currentFontIndex]; 
  typingIndex = 0; 
  displayedText = ''; 
  showText = true;  
  updateDownloadIconState();
}

function downloadImage() {
  if (downloadIcon.hasClass('disabled')) {
    return;
  }

  let textGraphics = createGraphics(800, 600);  
  textGraphics.clear();  
  textGraphics.textAlign(CENTER, CENTER);  
  textGraphics.textFont(currentFont);  
  textGraphics.textSize(64);  
  textGraphics.fill(0); 
  textGraphics.text(userInput, textGraphics.width / 2, textGraphics.height / 2);  
  textGraphics.save('Signature Sorcery.png');  
}


function keyPressed() {
  if (keyCode === ENTER) {
    userInput = inputBox.value();
    updateText();
    showText = true; 
    displayedText = '';  
    typingIndex = 0;  
    
    updateDownloadIconState();
  }
}

let fontSize = 68; 

function draw() {
  background(0);
  
  if (currentFont === 'WindSong') {
    fontSize = 40;
  } else {
    fontSize = 68;
  }
  
  textSize(fontSize); 
  fill(255, 0, 0);  

  textFont(currentFont); 

  if (userInput.length > 0) {
    if (typingIndex < userInput.length) {
      displayedText += userInput.charAt(typingIndex); 
      typingIndex++;  
      frameRate(20); 
    }
    text(displayedText, width / 2, height / 2);  
  } else {
    textFont('Jacquard 12'); 
    textSize(110); 
    textAlign(CENTER, CENTER); 
    textLeading(100);
    fill(255, 0, 0);
    text("Signature\nSorcery", width / 2, height / 2);  
  }
}

const backgroundMusic = document.getElementById('background-music');
const muteButton = document.getElementById('mute-button');

backgroundMusic.muted = true; 

muteButton.src = "images/unmute_icon.png";

function toggleMute() {
  backgroundMusic.muted = !backgroundMusic.muted;
  
  if (backgroundMusic.muted) {
    muteButton.src = "images/unmute_icon.png"; 
  } else {
    muteButton.src = "images/mute_icon.png"; 
  }
}

window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.display = 'none';
  backgroundMusic.play(); // Play the music on load
});

