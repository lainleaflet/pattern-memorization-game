const grid = document.getElementById("grid");
const progress = document.getElementById("progress");
const currentScoreDisplay = document.getElementById("currentScore");
const highScoreDisplay = document.getElementById("highScore");
const startButton = document.getElementById("start-btn");

let boxes = [];
let score = 0;
let pattern = [];
let clickEnabled = false;
let highScore = 0;

currentScoreDisplay.innerText = `Current Score: ${score}`;
highScoreDisplay.innerText = `High Score: ${highScore}`;

for (let i = 0; i < 9; i++){
    const box = document.createElement("div");
    boxes.push(box);
    box.classList.add("box");
    box.dataset.index = i;
    box.addEventListener("click", (x) => {
        if (!clickEnabled) return;
        light(x);
    });
    grid.appendChild(box);
}

let i = 0;
function light(x){
    clear();
    if(x instanceof Event){
        if (x.target == boxes[pattern[i]]) {
            x.target.classList.add('correct');
            i++;
            if (i == pattern.length){
                i = 0;
                score++;
                currentScoreDisplay.innerText = `Current Score: ${score}`;
                setTimeout(startGame, 1000);
            }
        } else {
              x.target.classList.add('incorrect');
              updateHighScore();
              i = 0;
              resetGame();
        }     
    } else {
        x.classList.add('light');
    }
}

function clear(){
    for (let i = 0; i < 9; i++){
        boxes[i].classList.remove('light');
        boxes[i].classList.remove('correct');
        boxes[i].classList.remove('incorrect');
    }
}

async function startGame(){
    progress.innerText = 'Computer\'s turn...';
    clear();
    startButton.disabled = true;
    generatePattern(pattern);
    executePattern(pattern);
    await sleep(pattern.length*1000);
    progress.innerText = 'Your turn...';
    clickEnabled = true;
}

function generatePattern(pattern){
    pattern.push(Math.floor(Math.random() * 9));
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executePattern(pattern){
    clickEnabled = false;
    for (let i = 0; i < pattern.length; i++){
            clear();
            light(boxes[pattern[i]]);
            await sleep(600); 
            clear();
            await sleep(200); 
    }  
}

function updateHighScore(){
    if (score > highScore){
        highScore = score;
        updateHighScoreDisplay();
    }
}

function updateHighScoreDisplay(){
    highScoreDisplay.innerText = `High Score: ${highScore}`;
}

function resetGame(){
    progress.innerText = "Game over!"
    score = 0;
    startButton.disabled = false;
    pattern.length = 0;
    currentScoreDisplay.innerText = `Current Score: ${score}`;
}

startButton.addEventListener('click', startGame);


