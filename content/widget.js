var QIITA_FAVICON_URL = 'https://cdn.qiita.com/assets/favicons/public/production-4ff10c1e1e2b5fcb353ff9cafdd56c70.ico' ;
var GOOGLE_RESULT_CLASS = '.rc'

function qiitaMatch(url) {
  var sharpEscapedURL = url.replace(/#/g, '%23');
  var qiitaMatch = sharpEscapedURL.match(/^http:\/\/qiita.com\/.*\/items\/(\w*)/);

  if (qiitaMatch == null) {
    return null;
  } else {
    return qiitaMatch[1];
  }
}

function getResultList() {
  var resultList = [];
  var elems =  document.querySelectorAll(GOOGLE_RESULT_CLASS);

  elems.forEach(function(elem, i) {
    resultList.push({
      parent: elem,
      url: elem.querySelector('a').href,
    });
  });

  return resultList;
}

function createWidget(result) {
  var url = result.url;
  var qiitaId = qiitaMatch(url);
  console.log(qiitaId, url);

  if (qiitaId == null) {
    return;
  }

  var message = {
    type: 'get_qiita_stock_count',
    qiitaId: qiitaId,
  };

  chrome.extension.sendMessage( message, function(res) {
    console.log('res');
    console.info(res, result);

    var widget = document.createElement('div');
    var favicon = document.createElement('img');
    var stock = document.createElement('span');

    widget.className =  'qiita-widget';
    widget.appendChild(favicon);
    widget.appendChild(stock);
    result.parent.prepend(widget);
    favicon.src = QIITA_FAVICON_URL;
    if (res.count >= 100) {
      stock.style.fontSize = '20px';
      stock.style.color = '#f46';
      stock.innerText = `${res.count}++`;
    } else {
      stock.innerText = `${res.count}`;
    }
  });
}

function main() {
  var resultList = getResultList();
  resultList.forEach(function(result) {
    createWidget(result);
  });
}

if (window.top == window.self) {
  main();
}
