function makeRequest(){
    const http = new XMLHttpRequest();
    let pkg = document.getElementById("pkg-name").value; 
    let fromDate = document.getElementById("from-date").value;
    let toDate = document.getElementById("to-date").value;
    let statValue = document.querySelector('input[name="stat-value"]:checked').value;
    let url='https://api.npmjs.org/downloads/' + statValue + '/' + fromDate + ':' + toDate + '/' + pkg;

    http.open("GET", url);
    http.send();
    http.onreadystatechange = (e) => {
        console.log(http.responseText);
    }
}

function toggleFromToDate(element){
    let fromDate = document.getElementById("from-date");
    let toDate = document.getElementById("to-date");
    let period = element.value;
    // console.log(period);
    if(period != "none"){
        // console.log("None");
        fromDate.disabled = true;
        toDate.disabled = true;
    }
    else{
        fromDate.disabled = false;
        toDate.disabled = false;
    }
}