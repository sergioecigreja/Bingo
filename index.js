//Game values
const NUMBER_LENGTH = 90;
const NUMBER_ROWS = 6;
const NUMBER_TABLE_CELLS = 15;
const numbers = Array.from({length: NUMBER_LENGTH}, (_, k) => k + 1);
let running = false;
let intervalId = -1;
let bingo;

//HTML Elements
const body = document.getElementsByTagName('body')[0];
const table = document.getElementById("gameTable");
const numbersList = document.querySelector('#numbersList');

//Speech Synthesis
const synth = window.speechSynthesis;
const voiceSelect = document.querySelector('select');
let voices = [];

const stopGame = () => {
    console.log("stopped");
    if (running) running = false;
    clearInterval(intervalId);
}

const startGame = () => {
    running = true;

    console.log("started");
    
    intervalId = window.setInterval(function() {
        if (running) nextNumber();
        else clearInterval();
       
    }, 2000);
}


function newGame() {
    bingo = {};

    numbers.forEach(element => {
        bingo[element] = false;
    });

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

    startGame();
}

newGame();

function nextNumber() {
    console.log("next number");

    let next = -1;

    do {
        next = generateRandomNumber();
    }while(bingo[next] == true);

    bingo[next] = true;

    document.getElementById("number" + next).className = "selected";

    sayNumber(next);
    addToList(next);
}

function sleep(milliseconds) {
    let now = new Date().getTime();
    while(new Date().getTime() < now + milliseconds) {

    }
}

function generateRandomNumber() {
    return Math.floor(Math.random() * NUMBER_LENGTH) + 1;
}

const populateVoiceList = () => {
    voices = synth.getVoices();

    voices.forEach(voice => {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';

        if (voice.default) {
            option.textContent += ' --DEFAULT';
        }

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name)
        voiceSelect.appendChild(option);
    });
}

function sayNumber(number) {
    let voices = synth.getVoices();
    const speakText = new SpeechSynthesisUtterance(number);
    speakText.voice = voices[0];
    synth.speak(speakText);
}


const addToList = (number) => {
    let listItem = document.createElement('li');
    listItem.textContent = number;
    numbersList.appendChild(listItem);
}