'use strict';

//add row of array to table, assume all elems are in string
function addRow(paramArr){
	let trToInsert = document.createElement("TR");
	for (let att of paramArr){
		let tdToInsert = document.createElement("TD");
		tdToInsert.textContent = att;

		//first put td inside tr, then put tr inside table
		trToInsert.appendChild(tdToInsert);
	}
	tableTag.appendChild(trToInsert);
}

//add the att to decision tree based on user selection, add the row to table
//and update mask
function addLogic(att){
	//we need to know what the user select (i.e. blue musk with seByUser) in the
	//current tab
	chrome.tabs.executeScript(
		null,
		{ file: 'app/tableCtrl/getBlueSeByUser.js' },
		(results) => {
			
			let commonAttSeByUser = JSON.parse(results[0]);
			let commonAttVal = commonAttSeByUser[att];
			let paramArr = [att];
			addRow(paramArr.concat(commonAttVal));
			chrome.storage.sync.get('tableSet', function(data) {
				data.tableSet[att] = commonAttVal;
				chrome.storage.sync.set({tableSet: data.tableSet}, function() {
					chrome.tabs.executeScript(
						{ file: 'app/tableCtrl/initMaskOnTable.js' }
					),
					() => {
						console.log("fin");
					}
			  });
		  });
		}
	);
}

//append tr tags but no store or set is performed on syn for tableSet
//only perform when the top buttons are perfromed
selectionOpt.onchange=function(){
	console.log(selectionOpt.value);
	//add row as instructed to the table
	addLogic(selectionOpt.value);
	//remove such option to avoid condition twice
	let toRemove = document.querySelector(`option[value='${selectionOpt.value}']`);
	selectionOpt.removeChild(toRemove);

	//go back to first option (Add Attribute)
	selectionOpt.value = "0";
}

//init table base on table array
chrome.storage.sync.get('tableSet', function(data){
	//clean the table first
	while(tableTag.firstChild){
		tableTag.removeChild(tableTag.firstChild);
	}

	let attAlreadyInTable = new Set();
	//init table
	//while doing this, update att already in table
	for(let att in data.tableSet){
		let paramArr = [featureCandidatesToDisplayname[att]];
		addRow(paramArr.concat(data.tableSet[att]));
		attAlreadyInTable.add(att);
	}

	console.log(attAlreadyInTable);
	//init selectionOpt options
	for(let att in featureCandidatesToDisplayname){
		//only add it if it is not in the table
		if(!attAlreadyInTable.has(att)){
			//I don't know why 'continue' will just exit this callback
			let optToInsert = document.createElement("OPTION");
			optToInsert.value = att;
			optToInsert.textContent = featureCandidatesToDisplayname[att];
			selectionOpt.appendChild(optToInsert);
		}
	}

});
