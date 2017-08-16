console.log('auto opener');


const GOOGLE_RESULT_CLASS = '.rc';

function getResultList() {
  const resultList = [];
  const elems =  document.querySelectorAll(GOOGLE_RESULT_CLASS);

  elems.forEach(function(elem, i) {
    resultList.push({
      parent: elem,
      url: elem.querySelector('a').href,
    });
  });

  return resultList;
}

function main() {
  const resultList = getResultList();

  const message = {
    type: 'open_url',
    resultList,
  }

  chrome.extension.sendMessage(message, function(res) {
    console.log('res');
    console.info(res);
  });
}

// on command action
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);

  if (request.type == 'open_url') {
    main();
  }
});


