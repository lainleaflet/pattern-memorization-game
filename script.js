const grid = document.getElementById("grid");
const progress = document.getElementById("progress");
const currentScore = document.getElementById("currentScore");
const highScore = document.getElementById("highScore");
const startButton = document.getElementById("start-btn");

let boxes = [];
let score = 0;
let pattern = [];
let clickEnabled = false;
// need to write code for initializing highscore

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

function light(x){
    clear();
    if(x instanceof Event){
        x.target.classList.add('light');
    } else {
        x.classList.add('light');
    }
}

function clear(){
    for (let i = 0; i < 9; i++){
        boxes[i].classList.remove('light');
    }
}

async function startGame(){
    clear();
    startButton.disabled = true;
    generatePattern(pattern);
    executePattern(pattern);
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
    progress.innerText = 'Computer\'s turn...';
    for (let i = 0; i < pattern.length; i++){
            clear();
            light(boxes[pattern[i]]);
            await sleep(600); 
            clear();
            await sleep(200); 
    }  
}

startButton.addEventListener('click', startGame);


