window.onload = (event) => {
    ;
}

function updateQuestionList(val) {
    var prevElement = document.getElementById("mainFormDiv");
    var numOfElements = document.getElementsByClassName('questionOrAnswer').length;
    while (numOfElements/6 < val) {
        var div = document.createElement('div');
        div.className = "form-check form-check-inline row";
        div.id = numOfElements/6+1;
        prevElement.appendChild(div);
        prevElement = document.getElementById(numOfElements/6+1);
        for (let i=5;i>=0;i--) {
            var div = document.createElement('div');
            div.className = "col";
            div.id = `col_${numOfElements/6+1}_${i}`;
            prevElement.appendChild(div);
            
            let thoElement = document.getElementById(`col_${numOfElements/6+1}_${i}`);
            
            var elem = document.createElement('input');
            elem.className = "questionOrAnswer form-control form-input";
            elem.type = "text";
            elem.name = `${i===5?"question":i===0?"answer":`option${-i+5}`}${numOfElements/6+1}`;
            elem.placeholder = `${i===5?"Question":i===0?"Answer":`Option ${-i+5}`} ${numOfElements/6+1}`;
            thoElement.appendChild(elem);
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