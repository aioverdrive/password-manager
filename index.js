const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
const firstDisplayEl = document.querySelector("#display1");
const secondDisplayEl = document.querySelector("#display2");
const generateBtn = document.querySelector("#generate-btn");
const sliderEl = document.querySelector(".slider");
const outputEl = document.querySelector("#char-value");
// Generates a random password with slider value in length
function generateRandomPassword(len) {
    let randomPassword = "";
    for (let i = 0; i < len; i++){
        let randomIndex = Math.floor(Math.random() * characters.length);
        randomPassword += characters[randomIndex];
    }
    return randomPassword;
}
// Displays generated passwords
function displayPasswords() {
    // parseFloat is necessary because slider only returns values in string form
    const sliderValue = parseFloat(sliderEl.value);
    const bothDisplays = document.querySelectorAll(".display-password");
    if (sliderValue > 15) {
        bothDisplays.forEach(function(display) {
            display.style.textAlign = "left";
            display.style.fontSize = "20px"; //prevent overflow
        });
    }
    else {
        bothDisplays.forEach(function(display){
            //reset to defaults if length isnt that long (thats what she said)
            display.style.textAlign = "center";
            display.style.fontSize = "24px";
        });
    }
    firstDisplayEl.textContent = generateRandomPassword(parseFloat(sliderValue));
    secondDisplayEl.textContent = generateRandomPassword(parseFloat(sliderValue));
}
generateBtn.addEventListener("click", displayPasswords);
//Provide a copy on click, this doesnt work on the minibrowser
function copyFirstPassword() {
navigator.clipboard.writeText(firstDisplayEl.textContent);
alert("Password copied!");
}

firstDisplayEl.addEventListener("click",copyFirstPassword);

function copySecondPassword() {
    navigator.clipboard.writeText(secondDisplayEl.textContent);
    alert("Password copied!");
}
secondDisplayEl.addEventListener("click",copySecondPassword);
// Slider shenanigans! 
// Getting the value of the slider to display
outputEl.innerHTML = sliderEl.value;
sliderEl.oninput = function(){
    outputEl.innerHTML = this.value;
}
//Magic customization time with linear gradient
sliderEl.addEventListener("mousemove", function() {
    let rawSliderValue = parseFloat(sliderEl.value);
    /* when i figured out the - 10 and * 5 trick to transpose values from 10-30
    into values from 0-100 to make the gradient percentages work it was such a brain blast holyy */
    let adjustedSliderValue = (rawSliderValue - 10)*5;
    /* Below is the correct way to implement the gradient for custom slider but i really like the 
    no 2nd percentage one so im keeping it like that */
    // let color = `linear-gradient(90deg, rgb(51, 153, 204)${adjustedSliderValue}%, rgb(194, 202, 232)${adjustedSliderValue}%)`;
    let color = `linear-gradient(90deg, rgb(51, 153, 204)${adjustedSliderValue}%, rgb(194, 202, 232))`;
    sliderEl.style.background = color;
})

