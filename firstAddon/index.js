'use strict';
//executing js file in specified file directory 'fileDir'
function execFile(fileDir){
    //following cmd will be exec in the scope of web page currently looked at
    //NOT in scope of Scraper Go extenstion!
    chrome.tabs.executeScript({
        file: fileDir
    });
}

//get the buttons
let goButton = document.getElementById("goButton");
let selectionOpt = document.getElementById("selectOpt");

//init selectionOpt by restoring it
chrome.storage.sync.get('selected', function(data) {
	selectOpt.value=data.selected;
});

//define what to do when clicking the buttons
goButton.onclick = function(){

	execFile('util/boxSelect/enableSelection.js');
};

//update selected in storage when opt defined
selectOpt.onchange = function(){
	chrome.storage.sync.set({selected: selectOpt.value}, function() {
  		//do nothing
 	});
};
