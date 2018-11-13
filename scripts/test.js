window.onload = function preloadJson() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/testing.json', true);
    xhr.onload = function() {
        if(this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.getElementById('test-section__pic').style.background = `url(${data[0].picUrl})`;
            document.getElementById('test-section__question').innerHTML = data[0].questionText;
            // console.log(data[0].answerOne);
        }
    }
    xhr.send();
}

// document.getElementById('button').addEventListener('click', loadText);

// function loadText() {
//     // Create XHR object
//     var xhr = new XMLHttpRequest();

//     // OPEN - type, url/file, async
//     xhr.open('GET', '../data/testing.json', true);

//     xhr.onload = function(){
//         if(this.status == 200) {
//             var data = JSON.parse(this.responseText);
//             console.log(data);
//         }
//     }

//     // Sends request
//     xhr.send();
// }