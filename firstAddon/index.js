'use strict';
//executing js file in specified file directory 'fileDir'
function execFile(fileDir){
    return function(){
        //following cmd will be exec in the scope of web page currently looked at
        //NOT in scope of Scraper Go extenstion!
        chrome.tabs.executeScript({
            file: fileDir
        });
    }
}

//get the buttons
let goButton = document.getElementById("goButton");

//define what to do when clicking the buttons
goButton.onclick = execFile('util/boxSelect/enableSelection.js');