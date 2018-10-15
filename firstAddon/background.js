'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({selected: "0"}, function() {
  	
  });
});