window.onload = (event) => {
    ;
}

function updateQuestionList(val) {
    var prevElement = document.getElementById("mainFormDiv");
    var numOfElements = document.getElementsByClassName('questionOrAnswer').length;
    while (numOfElements/2 < val) {
        for (let i=1;i>=0;i--) {
            var elem = document.createElement('input');
            elem.className = "questionOrAnswer form-control";
            elem.type = "text"
            elem.name = `${i===1?"question":"answer"}${numOfElements/2+1}`
            elem.placeholder = `${i===1?"Question":"Answer"} ${numOfElements/2+1}`
            prevElement.appendChild(elem);
        }
        numOfElements = document.getElementsByClassName('questionOrAnswer').length;
    }
    while (numOfElements/2 > val) {
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        numOfElements = document.getElementsByClassName('questionOrAnswer').length;
    }
}