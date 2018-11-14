// document.addEventListener("DOMContentLoaded", getJson);

function getJson() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/testing.json', true);
    xhr.onload = function() {
        if(this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.getElementById('test-section__pic').style.backgroundImage = `url(${data[0].picUrl})`;
            document.getElementById('test-section__question').innerHTML = data[0].questionText;
            // console.log(data[0].answerOne);
        }
    }
    xhr.send();
}

document.getElementById('button-start').addEventListener("click", startTest);

function startTest() {

    
    //  show test-section
    var testSection = document.getElementById('test-section');
    testSection.className += " display-flex";
    //  hide button-start
    var buttonStart = document.getElementById('button-start');
    buttonStart.className += " display-none";
    
    getJson();
}