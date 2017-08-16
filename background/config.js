var BG = chrome.extension.getBackgroundPage();

$(document).ready(function() {
  $(".extensions-link").bind( "click", function(){
    chrome.tabs.create({url: "chrome://extensions/"});
  });

  $("#main-section").show();

  $('saveButton').click(function() {
    console.log('button');
  }
});
