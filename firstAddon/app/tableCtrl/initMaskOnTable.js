'use strict';
//this code run in the scope of the tab
chrome.storage.sync.get('tableSet', function(data){
  console.log(data.tableSet);
	//function that judges whether such node meets tableSet req
  function tableSetJudge(node){
    //base case: tableSet is empty
    if(JSON.stringify(data.tableSet) === JSON.stringify({}))
      return false;

    //AND loop for rows
    for (let att in data.tableSet){
      //OR loop of Attribute values
      let initBool = false;
      for (let attVal of data.tableSet[att]){
        initBool = initBool || (node[att] === attVal);
      }
      if(!initBool)
        return false;
    }

    //survive all things in and loop? it is true!
    return true;
  }

  

  //find <body> tag
  let bodyQ = document.getElementsByTagName("BODY");
  let bd = bodyQ[0];

  //walk through the whold <Body> child nodes and mask nodes that match and have no maks
  walkDOM(bd,function(node){
    if(tableSetJudge(node)){
      //I shall be masked!
      if(!hasMask(node,'blue'))
        putOnMask(node,'blue');
    }else{
      //remove mask if it should not be mask
      if(hasMask(node,'blue',true))
        removeMask(node);
    }
  });

});
