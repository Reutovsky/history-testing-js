const buttonStart = document.getElementById('button__start-test');
const buttonAnswer = document.getElementById('button__give-answer');
const testSection = document.getElementsByClassName('test-section')[0];
const testSectionPic = document.getElementsByClassName('test-section__pic')[0];
const testSectionQuestion = document.getElementsByClassName('test-section__question')[0];
let currentQuestion = 0;

buttonStart.addEventListener('click', startTest);

function startTest() {
    //  show test-section
    testSection.className += ' display-flex';
    //  hide button-start
    buttonStart.className += ' display-none';
    // get JSON & test first time drawing
    getJson();
}

async function getJson() {
    // get JSON
    let response = await fetch('../data/testing.json');
    let data = await response.json();
    // pic & question painting
    testSectionPic.style.backgroundImage = `url(${data[0].picUrl})`;
    testSectionQuestion.innerHTML = data[0].questionText;
}

buttonAnswer.addEventListener('click', giveAnswer);

async function giveAnswer() {
    let response = await fetch('../data/testing.json');
    let data = await response.json();
    let dataLength = data.length;
    if(currentQuestion == dataLength - 1) {
        alert('THE END OF TEST!');
    } else {
        testSectionPic.style.backgroundImage = `url(${data[currentQuestion + 1].picUrl})`;
        testSectionQuestion.innerHTML = data[currentQuestion + 1].questionText;
        currentQuestion = currentQuestion + 1;
    }
}