'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({tableSet: {offsetWidth: [1,2,3]}}, function() {

  });

  chrome.storage.sync.set({selectSet: {}}, function() {

  });
});