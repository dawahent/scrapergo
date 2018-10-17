'use strict';
//in this version, I am only going to look at the width of
//the first masked node to guess desired nodes




//find the mask first!
let blueMaskSet = document.querySelectorAll("div[maskMark='blue']");
//find the masked nodes
let maskedNodeArray = [];
for (let i in blueMaskSet){
	maskedNodeArray.push(blueMaskSet[i].nextElementSibling);
}

//predict based on width of the first masked node
let guessWidth = maskedNodeArray[0].offsetWidth;
let guessResultNodeList = [];
//test if dom[att] === attVal, if so push to arr
function pushWhenMatchAtt(att, attVal){
	return (dom) => {
		if(dom[att] === attVal)
			if(!guessResultNodeList.includes(dom)){
				guessResultNodeList.push(dom);
			}
	};
}

let bodyQ = document.getElementsByTagName("BODY");
let bd = bodyQ[0];

//walk through the whold <Body> child nodes and mask nodes that match
walkDOM(bd,pushWhenMatchAtt("offsetWidth",guessWidth));
for (let i in guessResultNodeList){
	putOnMask(guessResultNodeList[i],'blue');
    // console.log(dom);
}

chrome.storage.sync.set({tableSet: {}}, function() {
    console.log("just updated tableSet in syn storage");
});

chrome.storage.sync.set({selectSet: guessResultNodeList}, function() {
    console.log("just updated selectSet in syn storage");
});

//return follwing variables for call back function
//yes, no return statements shall be used
guessResultNodeList[0]
