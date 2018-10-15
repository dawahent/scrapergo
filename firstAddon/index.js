'use strict';

//get the essential tags
let goButton = document.getElementById("goButton");
let guessOnSelectButton = document.getElementById("guessOnSelectButton");
let newTaskButton = document.getElementById("newTaskButton");
let selectionOpt = document.getElementById("selectOpt");
let tableTag = document.getElementById("tableTag");

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
