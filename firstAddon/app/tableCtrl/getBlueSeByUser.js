'use strict';
//get the nodelist first
var seByUserNodeList = document.querySelectorAll("div[seByUser]");

//initial to obj to return
var toRet = {};
for (let att in featureCandidatesToDisplayname){
  toRet[att] = new Set();
}

//transverce whole things in side the nodelist and push new att val to set
for (let node of seByUserNodeList){
  for(let att in featureCandidatesToDisplayname){
    console.log(node[att]);
    toRet[att].add(node[att]);
  }
}

//convert to array so call back don't return empty obj
for (let att in toRet){
  toRet[att] = Array.from(toRet[att]);
}

JSON.stringify(toRet)
