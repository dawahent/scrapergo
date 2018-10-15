//following code is run in scope of the web page!
'use strict';
console.log("Enabling Selection........");

//init for controlling what is click and what is not
let attriColor = "2px solid rgb(0, 0, 255)"; //selected or desired border color
let mouseoverColor = "2px solid rgb(255, 0, 0)"; //color when mouse over it
//click controller which keeps record of the last clicking time lastT
var clickCtr = {
	lastT : 0 ,
	update : function(clickedElement, isSelect){
        //current Time
        let currT = Math.floor(Number(new Date()));
		//if two clicks are more than 12 ms away, they are 2 distinct clicks
		if (currT > this.lastT + 12) {
			if(isSelect){
                //selecting
                removeMask(clickedElement);// remove the red mask first
                putOnMask(clickedElement,"blue");
            }else{
                //de-selecting
                removeMask(clickedElement);
                putOnMask(clickedElement,"red"); // put on red mask
            }
			this.lastT = currT;
		}
	}
};

//return a dom element div with such color and opacity of -3
//it should be just on top of the dom
//it is also transparent to mouse pointer!!!
function makeMask(dom, colorToBe){
    var toRet = document.createElement("DIV");
    toRet.style.background = colorToBe;
    toRet.style.zIndex = 85;
    toRet.style.position = "absolute";
    toRet.style.top = dom.offsetTop + "px";
    toRet.style.left = dom.offsetLeft + "px";
    toRet.style.width = dom.offsetWidth + "px";
    toRet.style.height = dom.offsetHeight + "px";
    toRet.style.opacity = 0.3;
    //important!!! mask should ignore mouse!!
    toRet.style.pointerEvents = "none";
    //easier to check whether this element is a mask
    toRet.maskMark = "maskMark";
    //document.querySelectorAll("div[maskMark") needs below to work
    toRet.setAttribute("maskMark",colorToBe);
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
    let newMask = makeMask(childDom, colorToBe);
    prt.insertBefore(newMask, childDom);
}

//remove the mask on the dom
//important: we assume dom is checked to be masked!
function removeMask(dom){
    let prt = dom.parentElement;
    let domIdx = Array.from(prt.childNodes).indexOf(dom);
    prt.removeChild(prt.childNodes[domIdx - 1]);
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

};

//when mouse out it, remove mask
let hideMask = function (){    
    event.preventDefault();
    //it should be assumed be that the event target has mask
    //red -> kill it
    if(hasMask(event.target, "red")) {
        removeMask(event.target);
    }
    //selected (blue) -> do nothing
};

//when clicking, update the click controller
let clickMask = function(e){
    var targetElement = e.target || e.srcElement;
    e.preventDefault();
    if (hasMask(targetElement, "red")) {
        //selecting
        clickCtr.update(targetElement, true);
    } else {
        //de-selecting
        clickCtr.update(targetElement, false);
    }
};


document.addEventListener("mouseover", dispMask);
document.addEventListener("click", clickMask);
document.addEventListener("mouseout", hideMask);