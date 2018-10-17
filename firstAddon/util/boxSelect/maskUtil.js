//return a dom element div with such color and opacity of -3
//it should be just on top of the dom
//it is also transparent to mouse pointer!!!
//seByUser indicates whether user specifically cliked on such dom to mask it
//colorToBe = 'red', seByUser cannot be true

function makeMask(dom, colorToBe, seByUser=false){
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
    //set 'seByUser' to the mask if user clicked at it
    if(seByUser){
      toRet.setAttribute("seByUser","undef");
    }

    return toRet;
}

//boolean function indicating whether an dom's former neighbor (if it has)
//is a mask with such color
//last bool indicates whether seByUser should be examined
function hasMask(childDom, colorToMatch, seByUser = false){
    let prt = childDom.parentElement;
    if(prt === null){
        return false;
    }

    let childDomIdx = Array.from(prt.childNodes).indexOf(childDom);
    if(childDomIdx == 0){
        //he is the eldest child!
        return false;
    }

    return isMask(prt.childNodes[childDomIdx - 1], colorToMatch, seByUser);
}

//check whether an dom element is a mask with certain color
//last bool indicates whether seByUser should be examined
function isMask(dom, colorToMatch, seByUser){
    //is it a mask?
    if(!dom.maskMark) return false;
    //if so, is it such color?
    if(seByUser)
      return !!dom["seByUser"];
    return dom.style.background === colorToMatch;
}

//create mask silbling with indicated color of such dom
function putOnMask(childDom, colorToBe, seByUser=false){
    let prt = childDom.parentElement;
    if(prt === null){
        return;
    }
    let newMask = makeMask(childDom, colorToBe, seByUser);
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

//later to be sep to another file:
//apply func to node and all child nodes of it in any depth
//ignore mask!
function walkDOM (node,func) {
    func(node);
    node = node.firstChild;
    while(node) {
        if(!isMask(node, 'blue')) {
          walkDOM(node,func);
          node = node.nextSibling;
        }
    }
}
