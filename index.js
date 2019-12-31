const NUMBER_LENGTH = 90;
const NUMBER_ROWS = 6;
const NUMBER_TABLE_CELLS = 15;
const numbers = Array.from({length: NUMBER_LENGTH}, (_, k) => k + 1);
const synth = window.speechSynthesis;
let running = false;

let bingo;

function newGame() {
    bingo = {};

    numbers.forEach(element => {
        bingo[element] = false;
    });

    const body = document.getElementsByTagName('body')[0];
    const table = document.getElementById("gameTable");

    for (i=0; i<NUMBER_ROWS; i++) {
        let tr = document.createElement('tr');
        for (j=0; j<NUMBER_TABLE_CELLS; j++) {
            let td = document.createElement('td');
            td.id = "number" + (i*NUMBER_TABLE_CELLS + j + 1);
            td.className = "unselected";
            td.innerHTML = i*NUMBER_TABLE_CELLS + j + 1;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    body.appendChild(table);

    running = true;
    
    window.setInterval(function() {
        if (running) nextNumber();
        else clearInterval();
       
    }, 2000);
}

newGame();

function startGame() {
    running = true;
    let window = window.speechSynthesis;
}

function nextNumber() {
    let next = -1;

    do {
        next = generateRandomNumber();
    }while(bingo[next] == true);

    bingo[next] = true;

    document.getElementById("number" + next).className = "selected";

    sayNumber(next);
}

function sleep(milliseconds) {
    let now = new Date().getTime();
    while(new Date().getTime() < now + milliseconds) {

    }
}


function generateRandomNumber() {
    return Math.floor(Math.random() * NUMBER_LENGTH) + 1;
}

function sayNumber(number) {
    let voices = synth.getVoices();
    const speakText = new SpeechSynthesisUtterance(number);
    speakText.voice = voices[0];

    console.log(synth.getVoices());

    synth.speak(speakText);
}