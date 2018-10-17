'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({tableSet: {}}, function() {

  });

  chrome.storage.sync.set({selectSet: {}}, function() {

  });
});
