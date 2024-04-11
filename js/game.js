var N = 9;
var X = [1, 2, 3, 2, 4, 1, 4, 5, 2, 5];
var Y = [4, 7, 3, 9, 5, 2, 8, 1, 4, 9];
var PLAY  = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0]; // Either 0, 1, -1

// Constants
const DELAY = 750;
const MAX_X = 10;
const MAX_Y = 10;
const SPACE = 50; // px

// Const DOM
const SampleBtn = document.querySelector('#sample');
const RandomBtn = document.querySelector('#random');
const ClearBtn = document.querySelector('#clear');
const MovesInp = document.querySelector('#moves');

const Player = document.querySelector('#player');
const SKY_BOX = document.querySelector('#sky');

var Level = 0;
var Position = 0;
var Sambosas = [];
var SambosasObj = [];
var Score = 0;

function movePlayer(diff) {
    Position += parseInt(diff); 
    Player.style.left = Position * SPACE + "px";
}

function setScore(sc) {
    Score = sc;
    ScoreLabel.textContent = Score;
}            

function clearSambosas() {
    Position = 0;
    Score = 0;
    movePlayer(0);
    setScore(0);
    Level = 0;
    TimeLabel.textContent = 0;
    for (var i = 0; i < SambosasObj.length; i++) {
        SambosasObj[i].remove();
    }
    Sambosas = [];
    SambosasObj = [];
}

function processInput() {
    clearSambosas();
    for (var i = 0; i < N; i++) {
        Sambosas.push({x: X[i], y: Y[i]});
    }
    MovesInp.value = "1, 0, 1, 0, 0, 0, 0, 0, 0, 0";
    initialize();
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomInput() {
    clearSambosas();
    for (var i = 0; i < N; i++) {
        Sambosas.push({x: randomInteger(0, MAX_X), y: randomInteger(0, MAX_Y)});
    }
    initialize();
}

function createSambosa(obj, id) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var sambosa = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    sambosa.classList.add("sambosa");
    sambosa.setAttribute("points", "0,20 20,20 10,0");
    svg.id = id + "xx";
    svg.style.left = obj.x * SPACE + "px";
    svg.style.top = (MAX_Y-obj.y+1) * SPACE + "px";
    svg.appendChild(sambosa);
    return svg;
}

function initialize() {
    Level = 0;
    Position = 0;
    Score = 0;
    for (var i = 0; i < N; i++) {
        oop = createSambosa(Sambosas[i], i);
        SKY_BOX.appendChild(oop);
        console.log(oop);
        SambosasObj.push(document.getElementById(i + "xx"));
    }
}

const ScoreLabel = document.querySelector("#score");
const TimeLabel = document.querySelector("#time");
function refresh() {
    movePlayer(PLAY[Level])
    for (var i = 0; i < N; i++) {
        if (Sambosas[i].y - Level == 1 && Sambosas[i].x == Position)
            Score++;
        if (Sambosas[i].y - Level == 0)
            SambosasObj[i].style.display = "none";
        else
            SambosasObj[i].style.top = ((MAX_Y-Sambosas[i].y+3) + Level) * SPACE + "px";
    }
    setScore(Score);
    
    TimeLabel.textContent = Level;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function start() {
    RandomBtn.disabled = "true";
    SampleBtn.disabled = "true";
    ClearBtn.disabled = "true";
    PLAY = MovesInp.value.split(",");
    console.log(PLAY);
    while (Level <= MAX_Y) {
        console.log("Played " + Level);
        refresh();
        Level++;
        await sleep(DELAY);
    }
    RandomBtn.disabled = "";
    SampleBtn.disabled = "";
    ClearBtn.disabled = "";
}