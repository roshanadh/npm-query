function makeRequest(){
    const http = new XMLHttpRequest();
    let url;
    let pkg = document.getElementById("pkg-name").value; 
    let statValue = document.querySelector('input[name="stat-value"]:checked').value;
    let statFor = document.querySelector('input[name="stat-for"]:checked').value;
    if(statFor == "none"){
        let fromDate = document.getElementById("from-date").value;
        let toDate = document.getElementById("to-date").value;
        url='https://api.npmjs.org/downloads/' + statValue + '/' + fromDate + ':' + toDate + '/' + pkg;
    }
    else{
        url='https://api.npmjs.org/downloads/' + statValue + '/' + statFor + '/' + pkg;
    }

    http.open("GET", url);
    http.send();
    http.onreadystatechange = (e) => {
        let statsModal = document.getElementById("stats-modal");
        let fetchData = document.getElementsByClassName("fetch-data")[0];
        statsModal.style.display = "block";
        fetchData.innerText = "";

        var json = JSON.parse(http.responseText);
        for(var key in json){
            if(json.hasOwnProperty(key)){
                fetchData.innerHTML += key.bold() + ": " + json[key] + "<br>";
            }
        }
    }
}

function toggleFromToDate(element){
    let fromDate = document.getElementById("from-date");
    let toDate = document.getElementById("to-date");
    let period = element.value;

    if(period != "none"){
        fromDate.disabled = true;
        toDate.disabled = true;
    }
    else{
        fromDate.disabled = false;
        toDate.disabled = false;
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var statsModal = document.getElementById("stats-modal");
    if (event.target == statsModal) {
      statsModal.style.display = "none";
    }
}
function closeModal(){
    var statsModal = document.getElementById("stats-modal");
    statsModal.style.display = "none";
}
