const OPEN_URL_COMMAND = 'open_url';

const WHITE_LIST = [
  'https://stackoverflow.com/.*',
  'http://qiita.com/.*',
  'https://github.com/.*',
]

const COUNT_LIMIT = 3;

function whiteListInclude(url) {
  for (let i = 0; i < WHITE_LIST.length; ++i) {
    const wexp =  WHITE_LIST[i];
    const regexp = new RegExp(wexp, "i");

    if (url.match(regexp)) {
      console.log('match', url, wexp);
      return true;
    }
  }

  return false;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'open_url') {

    let count = 0;
    const resultList = request.resultList;

    for (let i = 0; i < resultList.length; ++i) {
      const result= resultList[i];
      const url = result.url;

      if (i !== 0 && !whiteListInclude(url)) {
        continue;
      }

      chrome.tabs.create({
        url,
        active: i === 0,
      });

      if (count++ >= COUNT_LIMIT - 1) {
        break;
      }
    }

    sendResponse({
      ok: true,
    });
  }

  return true;
});

chrome.commands.onCommand.addListener(function(command) {
  if (command == OPEN_URL_COMMAND) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "open_url"}, function(response) {
        console.info(response);
      });
    });
  }
});
