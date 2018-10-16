'use strict';
//init table base on table array
chrome.storage.sync.get('tableSet', function(data){
	//clean the table first
	while(tableTag.firstChild){
		tableTag.removeChild(tableTag.firstChild);
	}


})

//add row of array to table, assume all elems are in string
function addRow(paramArr){
	console.log(33);
	let trToInsert = document.createElement("TR");
	for(let i in paramArr){
		let tdToInsert = document.createElement("TD");
		tdToInsert.textContent = i;
		trToInsert.appendChild(tdToInsert);
	}
	tableTag.appendChild(trToInsert);
}

//append tr tags but no store or set is performed on syn for tableSet
//only perform when the top buttons are perfromed
selectionOpt.onchange=function(){
	
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

