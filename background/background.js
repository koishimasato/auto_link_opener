chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request.type);

  if (request.type == 'get_qiita_stock_count') {
    getQiitaStockCount(request, sendResponse);
    return true;
  }

});

function qiitaStokerUrl(qiitaId) {
  return `https://qiita.com/api/v2/items/${qiitaId}/stockers?page=1&per_page=100`;
}

function getQiitaStockCount(request, sendResponse) {
  var accessToken = '744dad78d714ba42c806d0aa427eabca13dd7763';
  var headers = {
    'Authorization': 'Bearer '+ accessToken,
  };

  var url = qiitaStokerUrl(request.qiitaId);
  console.log(url);

  axios.get(url, { headers }).then((res) => {
    var data = res.data;
    var messageResponse = {
      count: data.length,
    }
    sendResponse(messageResponse);
  }).catch((error) => {
    console.error(error);
  });
}

