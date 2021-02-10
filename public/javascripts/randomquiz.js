function checkQuestions() {
    let currentElem = document.getElementById(`q1`);
    let i = 2;
    while(currentElem !== null) {
        let currentAns = currentElem.getElementsByTagName('label')[0].attributes['0'].value;
        let labels = currentElem.getElementsByTagName('label');
        for (let j = 1; j <= 4; j++) {
            if (labels[j].getElementsByTagName('p')[0].innerHTML == currentAns) {
                labels[j].className = "btn btn-success";
            } else if (labels[j].getElementsByTagName('p')[0].innerHTML != currentAns && labels[j].getElementsByTagName('input')[0].checked == true) {
                labels[j].className = "btn btn-danger";
            }
            
        };
        currentElem = document.getElementById(`q${i}`);
        i++;
    }
}