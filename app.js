const $ = document;
const wordText = $.querySelector(".word");
const hintText = $.querySelector(".hint");
const refreshBtn = $.querySelector(".refresh-word");
const checkBrn = $.querySelector(".check-word"),
inputField = $.querySelector("input");
const timeText = $.querySelector(".time b");
const pointPlayer = $.querySelector(".point b");

let correctWord;
let timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
        pointPlayer.innerText = "0";
    }, 1000);
};

const initGame = () => {

    initTimer(30);

    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    
    for (let i = wordArray.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));
  
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        
    }
    wordText.innerText = wordArray.join("");
    
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLocaleLowerCase();
    inputField.value = "";

    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();

refreshBtn.addEventListener("click" , initGame);

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();

    if(!userWord) return alert("Please enter a word check");

    if(userWord !== correctWord) {
        return alert(`Oops! ${userWord} is not a correct word`);
    }

    const lastPoint = parseFloat(pointPlayer.textContent);
    const plusPoint = 1;

    pointPlayer.innerText = lastPoint + plusPoint;

    alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);

    initGame();
};

checkBrn.addEventListener("click" , checkWord);












