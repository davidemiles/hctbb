// dummy hctb code
var ClearStaticLayer = function () {
    return null;
  };
  var ClearDynamicLayer = function () {
    return null;
  };
  var SetStaticPushPin = function () {
    return null;
  };
  var UpdateControlPanel = function (...a) {
    console.log(a);
  };
  var ZoomToBusStop = function () {
    return null;
  };
  var SetBusPushPin = function (a,b) {
    console.log(`bus at ${a}, ${b}`)
  };
  var ZoomToBusStop = function () {
    return null;
  };
  var ShowMapAlerts = function () {
    return null;
  };
  
  
  const fetch = require("node-fetch")
  
  fetch("https://login.herecomesthebus.com/Map.aspx/RefreshMap", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9,ja;q=0.8",
      "content-type": "application/json; charset=UTF-8",
      "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": ".ASPXFORMSAUTH=DB1E4CB78CE8BCAFC65546D04A7FA2296866A0809CC83D3C7AAFD26D0825677840840CCDEECCCEB10EA2C3FAA7E501914F46D7DD9C2B97DA24D5BB2958094445DA332DEDBE9FA7AE3F773BA49677CABBB12AB3A2E51835A42E99C78BA4A72D6B9FDD0190B8AA911D89B88A087563C8ACCBD93003BF38BA7ADB95CF3C7AD603EFD8423CBB842262D9DB1601164B064E855D5BE509521507C45F578A9DE3AB516F; login=latonjam53@gmail.com~29902; _gat=1; _gid=GA1.2.183461269.1660328636; _ga=GA1.2.996851505.1660328636; SRV=prdweb1; ASP.NET_SessionId=olqoohdkctsijgdc0kyamge5; ",
      "Referer": "https://login.herecomesthebus.com/Map.aspx",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "{ legacyID:'a384567e-380f-48ab-8be1-14d7d3d4c786',name:\"David Miles\",timeSpanId:\"6e7a050e-0295-4200-8edc-3611bb5de1c1\",wait:\"false\" }",
    "method": "POST"
  })  .then(res => res.json())
      .then(json => {
  
      eval(json.d)
   });