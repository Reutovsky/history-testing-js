const buttonStart = document.getElementById('button__start-test');
const buttonAnswer = document.getElementById('button__give-answer');
const testSection = document.getElementsByClassName('test-section')[0];
const testSectionPic = document.getElementsByClassName('test-section__pic')[0];
const testSectionQuestion = document.getElementsByClassName('test-section__question')[0];
const testSectionAnswers = document.getElementsByClassName('test-section__answers')[0];
const resultSection = document.getElementsByClassName('result-section')[0];
const resultSectionQuantity = document.getElementsByClassName('result-section__quantity')[0];
const resultSectionPercent = document.getElementsByClassName('result-section__percent')[0];

let currentQuestion = 0;
let quantityOfRightAnswers = 0;
let percentRightAnswers = 0;

buttonStart.addEventListener('click', startTest);

function startTest() {
    //  show test-section
    testSection.className += ' display-flex';
    //  hide button-start
    buttonStart.className += 'display-none';
    // get JSON & test first time drawing
    getJson();
}

async function getJson() {
    // get JSON
    let response = await fetch('../data/testing.json');
    let data = await response.json();
    // pic & question painting
    testSectionPic.style.backgroundImage = `url(${data[currentQuestion].picUrl})`;
    testSectionQuestion.innerHTML = data[currentQuestion].questionText;
    let output = `
        <form> 
            <div>
                <input type="radio" id="choice1" name="answerOption" value="answerOne">
                <label for="choice1">${data[currentQuestion].answerOne}</label>
            </div>
            <div>
                <input type="radio" id="choice2" name="answerOption" value="answerTwo">
                <label for="choice2">${data[currentQuestion].answerTwo}</label>
            </div>
            <div>
                <input type="radio" id="choice3" name="answerOption" value="answerThree">
                <label for="choice3">${data[currentQuestion].answerThree}</label>
            </div>
            <div>
                <input type="radio" id="choice4" name="answerOption" value="answerFour">
                <label for="choice4">${data[currentQuestion].answerFour}</label>
            </div>
        </form>
    `;
    // output = `<p> ${data[0].answerOne} </p>`;
    testSectionAnswers.innerHTML = output;
}

buttonAnswer.addEventListener('click', giveAnswer);

async function giveAnswer() {
    // get JSON
    let response = await fetch('../data/testing.json');
    let data = await response.json();
    //get data length
    let dataLength = data.length;
    // check last question
    if(currentQuestion == dataLength - 1) {
        let checked = document.querySelector('input[name="answerOption"]:checked').value;
        let rightAnswer = data[currentQuestion].rightAnswer;
        // if you'll answer right
        if (checked === rightAnswer) {
            quantityOfRightAnswers++;
        }
        // Hide test section & show result section anyway
        testSection.className += ' display-none';
        resultSection.className += ' display-block';
        // show quantity of right answers
        let outputResult = `<div>${quantityOfRightAnswers}</div>`;
        resultSectionQuantity.innerHTML = outputResult;
        // calculate percent of right answers
        percentRightAnswers = Math.round(quantityOfRightAnswers/dataLength*100);
        //show percent of right answers
        let outputPercent = `<div>У Вас ${percentRightAnswers}% правильных ответов</div>`;
        resultSectionPercent.innerHTML = outputPercent;
    // if its not a last question
    } else {
        let checked = document.querySelector('input[name="answerOption"]:checked').value;
        let rightAnswer = data[currentQuestion].rightAnswer;
        if (checked === rightAnswer) {
            quantityOfRightAnswers++;
        }
            output = `
                <form> 
                    <div>
                        <input type="radio" id="choice1" name="answerOption" value="answerOne">
                        <label for="choice1">${data[currentQuestion + 1].answerOne}</label>
                    </div>
                    <div>
                        <input type="radio" id="choice2" name="answerOption" value="answerTwo">
                        <label for="choice2">${data[currentQuestion + 1].answerTwo}</label>
                    </div>
                    <div>
                        <input type="radio" id="choice3" name="answerOption" value="answerThree">
                        <label for="choice3">${data[currentQuestion + 1].answerThree}</label>
                    </div>
                    <div>
                        <input type="radio" id="choice4" name="answerOption" value="answerFour">
                        <label for="choice4">${data[currentQuestion + 1].answerFour}</label>
                    </div>
                </form>
            `;
            testSectionAnswers.innerHTML = output;
            testSectionPic.style.backgroundImage = `url(${data[currentQuestion + 1].picUrl})`;
            testSectionQuestion.innerHTML = data[currentQuestion + 1].questionText;
            currentQuestion++;
    }
}