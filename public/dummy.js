 self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open("hctbb").then(function (cache) {
      return cache.addAll(["/"]);
    })
  );
});
 
self.addEventListener("fetch", function (event) {
  console.log(event.request.url);
 
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
if (
  location.protocol !== "https:" &&
  location.hostname != "127.0.0.1" &&
  location.hostname != "localhost"
) {
  location.protocol = "https:";
}
window.BusStopData = "";
const asin = Math.asin;
const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const PI = Math.PI;

// equatorial mean radius of Earth (in meters)
const R = 6378137;

function squared(x) {
  return x * x;
}
function toRad(x) {
  return (x * PI) / 180.0;
}
function hav(x) {
  return squared(sin(x / 2));
}

// hav(theta) = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLon - aLon)
function haversineDistance(a, b) {
  const aLat = toRad(Array.isArray(a) ? a[1] : a.latitude || a.lat);
  const bLat = toRad(Array.isArray(b) ? b[1] : b.latitude || b.lat);
  const aLng = toRad(Array.isArray(a) ? a[0] : a.longitude || a.lng || a.lon);
  const bLng = toRad(Array.isArray(b) ? b[0] : b.longitude || b.lng || b.lon);

  const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng);
  return 2 * R * asin(sqrt(ht));
}
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
  document.querySelector(
    "#panel"
  ).innerHTML = `${a[0]}<br>${a[1]}<br>${a[2]}<br>${a[3]}<br>${a[4]}<br${a[5]}<br>`;
};
var ZoomToBusStop = function () {
  return null;
};
var SetBusPushPin = function (a, b) {
  window.BusStopData = `${a}, ${b}`;
  document.querySelector(
    "#map"
  ).innerHTML = `<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=${window.BusStopData}&t=k&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><br><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div>`;

  if (navigator.geolocation) {
    fetch(`/nominatim?lat=${a}&lon=${b}`)
      .then((res) => res.json())
      .then((json) => {
        navigator.geolocation.getCurrentPosition(function (position) {
          const first = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          const second = { latitude: a, longitude: b };
          document.querySelector("#buslocate").innerHTML = `The bus is at ${
            window.BusStopData
          } (${(haversineDistance(first, second) / 1609.344).toFixed(
            3
          )} miles away)<br>${json.display_name}`;
        });
      });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
var ZoomToBusStop = function () {
  return null;
};
var ShowMapAlerts = function () {
  return null;
};
