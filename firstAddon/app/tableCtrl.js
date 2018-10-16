'use strict';
//init selectionOpt options
// for(let att in )

//init table base on table array
chrome.storage.sync.get('tableSet', function(data){
	//clean the table first
	while(tableTag.firstChild){
		tableTag.removeChild(tableTag.firstChild);
	}
	//init table
	for(let att in data.tableSet){
		let paramArr = [att];
		addRow(paramArr.concat(data.tableSet[att]));
	}

})

console.log(selectionOpt.value);

//add row of array to table, assume all elems are in string
function addRow(paramArr){
	let trToInsert = document.createElement("TR");
	for(let i of paramArr){
		let tdToInsert = document.createElement("TD");
		tdToInsert.textContent = i;
		trToInsert.appendChild(tdToInsert);
	}
	tableTag.appendChild(trToInsert);
}

//append tr tags but no store or set is performed on syn for tableSet
//only perform when the top buttons are perfromed
selectionOpt.onchange=function(){
	console.log(selectionOpt.value);
	switch(selectionOpt.value){

	case "1": //width
		addRow(['width']);
	break;

	case "2": //height
		addRow(['height']);
	break;


	default:
		console.log(selectionOpt.value);
	}

	
	selectionOpt.value = 0;
}

