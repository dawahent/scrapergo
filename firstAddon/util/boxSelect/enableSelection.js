'use strict';
console.log("Enabling Selection........");

//init for controlling what is click and what is not
let indicolor = "2px solid rgb(55, 255, 40)";
let emptycolor = "2px solid rgb(255, 255, 255)";
var clickCtr = {
	lastT : 0 ,
	push : function(T,e,c){
		//by same clicks
		if (T <= this.lastT + 12) {
			// do nothing as the first parameter with same T booms!
		}
		//not same clicks
		else {
			e.style.border = c;
			console.log(e.title);
			this.lastT = T;
		}
	}
};

let dispBorder = function(){
    event.preventDefault();
	if(event.target.style.border === ""){
        event.target.style.border = "2px solid rgb(255, 0, 0)";
    }
}

let hideBorder = function (){    
    event.preventDefault();
    if(event.target.style.border === "2px solid rgb(255, 0, 0)"){
        event.target.style.border = "";
    }
}

let clickBorder = function(e){
    e.preventDefault();
    if (this.style.border !== attriColor) {
        currT = Math.floor(Number(new Date()));
        clickCtr.push(currT,this,attriColor);
    } else {
        currT = Math.floor(Number(new Date()));
        clickCtr.push(currT,this,"");
    }
}


document.addEventListener("mouseover", dispBorder);
document.addEventListener("click", clickBorder);
document.addEventListener("mouseout", hideBorder);