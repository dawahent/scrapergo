//following code is run in scope of the web page!
'use strict';
console.log("Enabling Selection........");

//init for controlling what is click and what is not
let attriColor = "2px solid rgb(0, 0, 255)"; //selected or desired border color
let mouseoverColor = "2px solid rgb(255, 0, 0)"; //color when mouse over it
//click controller which keeps record of the last clicking time lastT
var clickCtr = {
	lastT : 0 ,
	update : function(clickedElement,colorToBe){
        //current Time
        let currT = Math.floor(Number(new Date()));
		//if two clicks are more than 12 ms away, they are 2 distinct clicks
		if (currT > this.lastT + 12) {
			clickedElement.style.border = colorToBe;
			this.lastT = currT;
		}
	}
};

//return a dom element div with such color and opacity of -3
//it is also transparent to mouse pointer!!!
function makeMask(colorToBe){
    var toRet = document.createElement("DIV");
    toRet.style.background = colorToBe;
    toRet.style.zIndex = 85;
    toRet.style.position = "absolute";
    toRet.style.top = "0px";
    toRet.style.left = "0px";
    toRet.style.width = "100%";
    toRet.style.height = "100%";
    toRet.style.opacity = 0.3;
    //important!!! mask should ignore mouse!!
    toRet.style.pointerEvents = "none";
    //easier to check whether this element is a mask
    toRet.maskMark = "maskMark";
    return toRet;
}

//boolean function indicating whether an dom's former neighbor (if it has)
//is a mask with such color
function hasMask(childDom, colorToMatch){
    let prt = childDom.parentElement;
    if(prt === null){
        return false;
    }

    let childDomIdx = Array.from(prt.childNodes).indexOf(childDom);
    if(childDomIdx == 0){
        //he is the eldest child!
        return false;
    }
    return isMask(prt.childNodes[childDomIdx - 1], colorToMatch);
}

//check whether an dom element is a mask with certain color
function isMask(dom, colorToMatch){
    //is it a mask?
    if(!dom.maskMark) return false;
    //if so, is it such color?
    return dom.style.background === colorToMatch;
}

//create mask silbling with indicated color of such dom
function putOnMask(childDom, colorToBe){
    let prt = childDom.parentElement;
    if(prt === null){
        return;
    }
    let newMask = makeMask(colorToBe);
    prt.insertBefore(newMask, childDom);
}

//two types of transparent maskes are used: red and blue


//when mouse over it, make sure it is masked
let dispMask = function(){
    event.preventDefault();
    //if it has a red mask, ignore
    if(hasMask(event.target, "red")) {
        return;
    }

    //if it has a blue mask, ignore
    if(hasMask(event.target, "blue")) {
        return;
    }

    //no mask? put on the mask!
    putOnMask(event.target, "red");

	// if(event.target.style.border === ""){
 //        event.target.style.border = mouseoverColor;
 //    }
};

//when mouse out it, remove mask
let hideMask = function (){    
    event.preventDefault();
    
    // if(event.target.style.border === mouseoverColor){
    //     event.target.style.border = "";
    // }
};

//when clicking, update the click controller
let clickBorder = function(e){
    var targetElement = e.target || e.srcElement;
    e.preventDefault();
    if (targetElement.style.border !== attriColor) {
        clickCtr.update(targetElement,attriColor);
    } else {
        clickCtr.update(targetElement,"");
    }
};


document.addEventListener("mouseover", dispMask);
document.addEventListener("click", clickBorder);
document.addEventListener("mouseout", hideMask);