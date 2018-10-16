'use strict';

//get the essential tags

var goButton = document.getElementById("goButton");
var guessOnSelectButton = document.getElementById("guessOnSelectButton");
var newTaskButton = document.getElementById("newTaskButton");
var selectionOpt = document.getElementById("selectOpt");
var tableTag = document.getElementById("tableTag");

//define what to do when clicking the buttons
goButton.onclick = function(){
	chrome.tabs.executeScript(
		null,
		{ file: 'util/boxSelect/enableSelection.js' },
		(results) => {
			goButton.style.pointerEvents = "none";
		}
	);
};

guessOnSelectButton.onclick = function(){
	chrome.tabs.executeScript(
		null,
		{ file: 'app/predictor/predictOnMask/simpleGuessOnWidth.js' },
		(results) => {
			console.log(results[0]);
			guessOnSelectButton.style.pointerEvents = "none";
		}
	);
}

newTaskButton.onclick = function(){
	chrome.storage.sync.set({tableSet: {}}, function() {

	});
	chrome.storage.sync.set({selectSet: {}}, function() {

	});
	//clean the table
	while(tableTag.firstChild){
		tableTag.removeChild(tableTag.firstChild);
	}
};
