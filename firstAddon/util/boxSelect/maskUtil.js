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
// export { makeMask, hasMask, isMask, putOnMask, removeMask };