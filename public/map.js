
               window.map =  L.map('map')

     if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position) {
          var a = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          window.map.setView([a.lat,a.long], 15);

        })


        }  else {
            window.map.setView([37.6000, -95.6650], 15);
        }
   window.addEventListener('load', async () => {
            if ('serviceWorker' in navigator && location.hostname != "localhost" && location.hostname != "127.0.0.1") {
          try {
            await navigator
                  .serviceWorker
                  .register('sw.js');
          }
          catch (e) {
            console.log('Sevice Worker registration failed...');
          }
        }
      });
        document.addEventListener("DOMContentLoaded", function () {
          if (localStorage["user"]) {
            document.querySelector("#user").value = localStorage["user"] || "";
            document.querySelector("#password").value =
              localStorage["pass"] || "";
            document.querySelector("#code").value =
              localStorage["code"] || "29902";
          }
  
          if (localStorage["cookie"] != "undefined" || !localStorage["cookie"]) {
            document.querySelector("#user").value = localStorage["user"] || "";
            document.querySelector("#password").value =
              localStorage["pass"] || "";
            document.querySelector("#code").value =
              localStorage["code"] || "29902";
            document.querySelector("#status").innerHTML =
              "Cookie saved. Fectching data.";
            document.querySelector("#login").disabled = true;
            refreshMap();
          }
        });
     document.getElementById('installAppBtn').addEventListener('click', async () => {
      if (deferredPrompt !== null) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
              deferredPrompt = null;
          }
      }
  });
        function refreshMap() {
          document.querySelector("#status").innerHTML = "Updating map...";
  
          fetch(
            `/refresh?cookie=${localStorage["cookie"]}&name=${localStorage["name"]}&person=${localStorage["person"]}&time=${localStorage["time"]}&cache=${Math.random()}`
          )
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
              if (json.d) {
                eval(json.d);
                document.querySelector("#status").innerHTML =
                  "Logged in. Fetched data. Updating in 10 seconds.";
                document.querySelector("#login").disabled = true;
                if (!window.Started) {
                  window.Started = setInterval(refreshMap, 10000);
                }
              }
  
              if (json.Message) {
                clearInterval(window.Started);
                window.Started = undefined;
                document.querySelector("#status").innerHTML =
                  "Session expired. Log in again please :)";
                document.querySelector("#login").disabled = false;
              }
            });
        }
  
        function login() {
          if (
            !document.querySelector("#user").value ||
            !document.querySelector("#password").value ||
            !document.querySelector("#code").value
          )
            return alert("Please fill in ALL fields.");
          document.querySelector("#login").disabled = true;
          localStorage.setItem("user") = document.querySelector("#user").value;
          localStorage.setItem("pass") = document.querySelector("#password").value;
          localStorage.setItem("code") = document.querySelector("#code").value;
  
          fetch(
            `/cookie?user=${document.querySelector("#user").value}&pass=${
              document.querySelector("#password").value
            }&code=${document.querySelector("#code").value}&cache=${Math.random()}`
          )
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                document.querySelector("#status").innerHTML =
                  "Logged in. Fetching data...";
                localStorage["cookie"] = json.cookie;
                localStorage["name"] = json.name;
                localStorage["person"] = json.person;
                localStorage["time"] = json.time;
                if (!window.Started) {
                  window.Started = setInterval(refreshMap, 10000);
                }
              }
            });
        }