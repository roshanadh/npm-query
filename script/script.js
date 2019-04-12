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
        let statValue = document.querySelector('input[name="stat-value"]:checked').value;

        statsModal.style.display = "block";
        fetchData.innerText = "";

        if(statValue == "point"){
            console.log("POINT REACHED");
            var json = JSON.parse(http.responseText);
            console.log(json);
            for(var key in json){
                if(json.hasOwnProperty(key)){
                    fetchData.innerHTML += key.bold() + ": " + json[key] + "<br>";
                    console.log(key.bold() + ": " + json[key]);
                }
            }
        }
        else if(statValue == "range"){
            console.log("RANGE REACHED");
            var json = JSON.parse(http.responseText);
            for(var key in json){
                if(json.hasOwnProperty(key)){
                    if(key != "downloads"){
                        console.log("DOWNLOAD NOT REACHED!");
                        fetchData.innerHTML += key.bold() + ": " + json[key] + "<br>";
                        console.log(key.bold() + ": " + json[key]);
                    }
                    else{
                        console.log("DOWNLOADS REACHED!");
                        var jsonArray = json.downloads;
                        jsonArray.forEach((nestedJson) => {
                            var needLineBreak = 0;
                            for(var nestedKey in nestedJson){
                                fetchData.innerHTML += nestedKey.bold() + ": " + nestedJson[nestedKey] + " ";
                                needLineBreak = (needLineBreak + 1) % 2;
                                if(needLineBreak == 0)
                                    fetchData.innerHTML += "<br>";
                                console.log(nestedKey, nestedJson[nestedKey]);
                            }
                        });
                    }
                }
                else{
                    console.log("json doesnot have key!");
                }
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

function closeModal(){
    var statsModal = document.getElementById("stats-modal");
    statsModal.style.display = "none";
}
