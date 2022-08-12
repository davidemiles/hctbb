const express = require("express");
const app = express();
const fetch = require("node-fetch")
const puppeteer = require('puppeteer');

app.use(express.static("public"));

app.get("/nominatim", function(request, response) {
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${request.query.lat}&lon=${request.query.lon}&format=json`, {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
  },
  "method": "GET"
})  .then(res => res.json())
    .then(json => response.json(json));
});
app.get("/refresh", function(request, response) {
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
    "cookie": request.query.cookie,
    "Referer": "https://login.herecomesthebus.com/Map.aspx",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": JSON.stringify({ legacyID:request.query.person,name:request.query.name,timeSpanId:request.query.time,wait:"false" }),
  "method": "POST"
})  .then(res => res.json())
    .then(json => response.json(json));
});
app.get("/cookie", async function(req, res) {
  if (!req.query.user||!req.query.pass||!req.query.code) return res.json({success:false,message:"Please provide all credentals"})
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],});
  console.log("[Info] Browser instance started")

  const page = await browser.newPage();
  console.log("[Info] Opened a new page")

  await page.goto('https://login.herecomesthebus.com/Authenticate.aspx');
  await page.type(`input[name="ctl00$ctl00$cphWrapper$cphContent$tbxUserName"]`, req.query.user)
  await page.type(`input[name="ctl00$ctl00$cphWrapper$cphContent$tbxPassword"]`, req.query.pass)
  await page.type(`input[name="ctl00$ctl00$cphWrapper$cphContent$tbxAccountNumber"]`, req.query.code)
  await page.click('input[name="ctl00$ctl00$cphWrapper$cphContent$btnAuthenticate"]');
  console.log("[Info] Logging in to Here Comes The Bus")

 setTimeout(async function(){
      const cookies = await page.cookies();
const value = await page.$$eval('option[selected="selected"]', el => { return {name: el[1].innerHTML, person: el[1].value, time: el[2].value} });

  var i = 0
  var cookie = ""
  console.log("[Info] Parsing cookie")

  while (i<cookies.length){
    cookie += `${cookies[i].name}=${cookies[i].value}; `
    i++
  }
 res.json({success:true,cookie:cookie,...value})

 await browser.close();
 console.log("[Info] Browser instance closed")

 },5000)



});

process.on('uncaughtException', function(err) {
  console.log('[Error] ' + err);
});

// listen for requests :)
const listener = app.listen(process.env.PORT||8080, function() {
  console.log("HCTBB is listening on port " + listener.address().port + " :)");
});
