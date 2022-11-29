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
  window.map = map.setView([a,b], 15);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  L.marker([a,b]).addTo(map)
      .bindPopup('Your bus is here')
      .openPopup();
 
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
