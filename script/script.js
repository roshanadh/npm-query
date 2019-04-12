function makeRequest(){
    const http = new XMLHttpRequest();
    let url;
    let pkg = document.getElementById("pkg-name").value; 
    let statValue = document.querySelector('input[name="stats-value"]:checked').value;
    let statFor = document.querySelector('input[name="stats-for"]:checked').value;
    let fromDate = document.getElementById("from-date").value;
    let toDate = document.getElementById("to-date").value;
    let statsModal = document.getElementById("stats-modal");
    let fetchData = document.getElementsByClassName("fetch-data")[0];
    if(pkg.trim() == ""){
        statsModal.style.display = "block";
        fetchData.innerText = "You must enter a package name!";
    }
    else{
        if(statFor == "none"){
            url='https://api.npmjs.org/downloads/' + statValue + '/' + fromDate + ':' + toDate + '/' + pkg;
        }
        else{
            url='https://api.npmjs.org/downloads/' + statValue + '/' + statFor + '/' + pkg;
        }
    
        http.open("GET", url);
        http.send();
        http.onreadystatechange = (e) => {
            let statValue = document.querySelector('input[name="stats-value"]:checked').value;
    
            statsModal.style.display = "block";
            fetchData.innerText = "";
    
            if(statValue == "point"){
                var json = JSON.parse(http.responseText);
                for(var key in json){
                    if(json.hasOwnProperty(key)){
                        fetchData.innerHTML += key.bold() + ": " + json[key] + "<br>";
                    }
                }
            }
            else if(statValue == "range"){
                var json = JSON.parse(http.responseText);
                for(var key in json){
                    if(json.hasOwnProperty(key)){
                        if(key != "downloads"){
                            fetchData.innerHTML += key.bold() + ": " + json[key] + "<br>";
                        }
                        else{
                            var jsonArray = json.downloads;
                            jsonArray.forEach((nestedJson) => {
                                var needLineBreak = 0;
                                for(var nestedKey in nestedJson){
                                    fetchData.innerHTML += nestedKey.bold() + ": " + nestedJson[nestedKey] + " ";
                                    
                                    // Check if line break should be inserted
                                    needLineBreak = (needLineBreak + 1) % 2;
                                    if(needLineBreak == 0)
                                    // Concatenate every two lines: for downloads: <num> and day:<date>
                                    // Then after concatenating the two lines, break a line - repeat
                                        fetchData.innerHTML += "<br>";
                                }
                            });
                        }
                    }
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
