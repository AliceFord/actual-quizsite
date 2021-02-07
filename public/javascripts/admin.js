window.onload = (event) => {
    ;
}

function updateQuestionList(val) {
    var prevElement = document.getElementById("mainFormDiv");
    var numOfElements = document.getElementsByClassName('questionOrAnswer').length;
    while (numOfElements/6 < val) {
        for (let i=5;i>=0;i--) {
            var elem = document.createElement('input');
            elem.className = "questionOrAnswer form-control";
            elem.type = "text"
            elem.name = `${i===5?"question":i===0?"answer":`option${-i+5}`}${numOfElements/6+1}`
            elem.placeholder = `${i===5?"Question":i===0?"Answer":`Option ${-i+5}`} ${numOfElements/6+1}`
            prevElement.appendChild(elem);
        }
        numOfElements = document.getElementsByClassName('questionOrAnswer').length;
    }
    while (numOfElements/6 > val) {
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        numOfElements = document.getElementsByClassName('questionOrAnswer').length;
    }
}