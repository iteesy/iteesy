const addLineButton = document.querySelector(".addLineButton");
const inputField = document.querySelector(".line1");
const searchContainer = document.querySelector(".search-container");

let lineCount = 1;
let showingFinalLine = false;
let isTyping = false;

function typeWriter(text) {
    isTyping = true;
    inputField.value = '';
    let i = 0;
    const speed = 50; // milliseconds per character

    function type() {
        if (i < text.length) {
            inputField.value += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            isTyping = false;
        }
    }
    type();
}

function addLine(){
    if (isTyping) return; // Prevent clicking while typing
    console.log('Current line count:', lineCount);
    
    if (showingFinalLine) {
        // Create new container for candles
        const candleContainer = document.createElement('div');
        candleContainer.style.display = 'flex';
        candleContainer.style.gap = '50px';
        candleContainer.style.marginLeft = '12px';
        candleContainer.style.marginTop = '20px';

        // Replace search container with empty candle container first
        searchContainer.parentNode.replaceChild(candleContainer, searchContainer);

        // Add candles one at a time with animation
        for (let i = 0; i < 11; i++) {
            setTimeout(() => {
                const candleImg = document.createElement('img');
                candleImg.src = 'photos/candlewtleftani.gif';
                candleImg.alt = 'Animated candle';
                candleImg.style.opacity = '0';
                candleContainer.appendChild(candleImg);
                
                // Fade in the candle
                setTimeout(() => {
                    candleImg.style.transition = 'opacity 0.5s';
                    candleImg.style.opacity = '1';
                }, 50);
            }, i * 300); // 300ms delay between each candle
        }
        return;
    }

    if (lineCount === 1) {
        typeWriter("if this ache is no more than bloat");
    } else if (lineCount === 2) {
        typeWriter("if this tea will grant me immunity");
    } else if (lineCount === 3) {
        typeWriter("if my body is something");
    } else if (lineCount === 4) {
        typeWriter("that can be debugged.");
        showingFinalLine = true;
    } 
    
    lineCount++;
    if (lineCount > 4) {
        lineCount = 1;
    }
}