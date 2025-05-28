// Conectare cu API si trimitere date sesiune
// Conectare cu API pentru a prelua citat (aleatoriu din baza de date)
// Stilizeaza cu CSS (probabil mai putin ca nu e destul timp)

const ID = localStorage.getItem("IDJucator")
const Username = localStorage.getItem("Username")
const Admin = localStorage.getItem("Admin")
if (ID == null || Username == null) {
    window.location.replace("../signin")
    }
else {
    const elementUsername = document.getElementById("Username")
    elementUsername.innerText = Username 
}

if (Admin == 1) {
    const adminButton = document.createElement('button');
    adminButton.setAttribute('onclick', 'admin()');
}

function admin() {
    window.location.replace("../admin")
}

let Citat = "";
const Text1 = "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best."
const Text2 = "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe"
const Text3 = "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind."
const Text4 = "You know you're in love when you can't fall asleep because reality is finally better than your dreams."
const Texte = [Text1, Text2, Text3, Text4];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min); }
let NrRandom = getRandomInt(0, 3)

Citat = Texte[NrRandom];


function play() {
    window.location.replace("../play")
}

const ElementCitat = document.getElementById("Citat");
const ElementInput = document.getElementById("Input");
const ElementTimer = document.getElementById("Cronometru");
const ElementNumaratoare = document.getElementById("Numaratoare");
const ElementRezultate = document.getElementById("Rezultate");
ElementInput.disabled = true;
let NrNum = 4;
let NrCaractere = 0;
let secunde = -3;

function timerTick() {
    secunde += 1;
    if (secunde >= 0) {
        ElementTimer.innerText = secunde;
    }
}


function countdown() {
    NrNum -= 1
    if (NrNum == 0) {
        ElementNumaratoare.innerText = "Start";
        clearInterval(nrInversa);
        ElementInput.disabled = false;
        ElementInput.focus();
    }
    else {
        ElementNumaratoare.innerText = NrNum;
    }    
}

function endRace() {
    let NrCuvinte = NrCaractere / 5;
    let WPM = Math.round(NrCuvinte / (secunde / 60));
    ElementRezultate.innerText = WPM + " WPM  " + "Timp: " + secunde
    ElementInput.innerText = ""
    ElementInput.disabled = true;
}

countdown()
let nrInversa = setInterval(countdown, 1000);
let TimerRun = setInterval(timerTick, 1000);


Citat.split("").forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    ElementCitat.appendChild(characterSpan)
    NrCaractere += 1;
})


ElementInput.addEventListener('input', () => {
    const arrayCitat = ElementCitat.querySelectorAll('span')
    const arrayInput = ElementInput.value.split('')
    let corect = true;
    arrayCitat.forEach((characterSpan, index) => {
        const litera = arrayInput[index]
        if (litera == null) {
            characterSpan.classList.remove("gresit")
            characterSpan.classList.remove("corect")
            corect = false
        }else if (litera === characterSpan.innerText) {
            characterSpan.classList.remove("gresit")
            characterSpan.classList.add("corect")
        } else {
            characterSpan.classList.remove("corect")
            characterSpan.classList.add("gresit")
            corect = false
        }
    })

    if (corect) {
        clearInterval(TimerRun)
        endRace()
    }
});
