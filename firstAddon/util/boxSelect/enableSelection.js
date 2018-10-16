//following code is run in scope of the web page!
'use strict';
console.log("Enabling Selection........");

// import { makeMask, hasMask, isMask, putOnMask, removeMask } from "./maskUtil.js";

//init for controlling what is click and what is not
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
                putOnMask(clickedElement,"blue", true);
            }else{
                //de-selecting
                removeMask(clickedElement);
                putOnMask(clickedElement,"red"); // put on red mask
            }
			this.lastT = currT;
		}
	}
};



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
