window.onload = (event) => {
    ;
}

function updateQuestionList(val) {
    var prevElement = document.getElementById("mainFormDiv");
    var numOfElements = document.getElementsByClassName('col').length;
    while (numOfElements/8 < val) {
        var div = document.createElement('div');
        div.className = "form-check form-check-inline row";
        div.id = numOfElements/8+1;
        prevElement.appendChild(div);
        prevElement = document.getElementById(numOfElements/8+1);

        var div = document.createElement('div');
        div.className = "col";
        div.id = `col_${numOfElements/8+1}_7`;
        prevElement.appendChild(div);

        let divElem = document.getElementById(`col_${numOfElements/8+1}_7`);
        
        var select = document.createElement('select');
        select.className = "subject form-control form-input";
        select.id = `subject_${numOfElements/8+1}`;
        select.name = `subject_${numOfElements/8+1}`;
        divElem.appendChild(select);

        const SUBJECTS = ["Art", "Biology", "Chemistry", "Mandarin", "Computer Science", "DT", "Drama", "English literature", "English language", "Food and Nutrition", "Geography", "German", "History", "ICT", "Maths", "Music", "Physics", "PE", "Statistics"];
        
        for (let subject in SUBJECTS) {
            let divElem = document.getElementById(`subject_${numOfElements/8+1}`);
        
            var opt = document.createElement('option');
            opt.value = SUBJECTS[subject];
            opt.name = SUBJECTS[subject];
            opt.innerHTML = SUBJECTS[subject];
            divElem.appendChild(opt);
        }

        var div = document.createElement('div');
        div.className = "col";
        div.id = `col_${numOfElements/8+1}_6`;
        prevElement.appendChild(div);
        
        let thoElement = document.getElementById(`col_${numOfElements/8+1}_6`);
        
        var elem = document.createElement('input');
        elem.className = "topic form-control form-input";
        elem.type = "text";
        elem.name = `topic${numOfElements/8+1}`;
        elem.placeholder = `Topic ${numOfElements/8+1}`;
        thoElement.appendChild(elem);

        for (let i=5;i>=0;i--) {
            var div = document.createElement('div');
            div.className = "col";
            div.id = `col_${numOfElements/8+1}_${i}`;
            prevElement.appendChild(div);
            
            let thoElement = document.getElementById(`col_${numOfElements/8+1}_${i}`);
            
            var elem = document.createElement('input');
            elem.className = "questionOrAnswer form-control form-input";
            elem.type = "text";
            elem.name = `${i===5?"question":i===0?"answer":`option${-i+5}`}${numOfElements/8+1}`;
            elem.placeholder = `${i===5?"Question":i===0?"Answer":`Option ${-i+5}`} ${numOfElements/8+1}`;
            thoElement.appendChild(elem);
        }
        numOfElements = document.getElementsByClassName('col').length;
    }
    while (numOfElements/8 > val) {
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        document.getElementsByClassName('questionOrAnswer')[document.getElementsByClassName('questionOrAnswer').length-1].remove();
        numOfElements = document.getElementsByClassName('questionOrAnswer').length;
    }
}