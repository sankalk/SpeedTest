var cities = [
["fra-de", 50.116667, 8.683333, "Frankfurt"],
["ams-nl", 52.366667, 4.9, "Amsterdam"],
["par-fr", 48.856613, 2.352222, "Paris"],
["lon-gb", 51.507222, -0.1275, "London"],
["sel-kor", 37.566667, 126.966667, "Seoul"],
["sgp", 1.283333, 103.833333, "Singapore"],
["hnd-jp", 35.689722, 139.692222, "Tokyo"],
["nj-us", 40.71274, -74.005974, "New York"],
["tor-ca", 43.741667, -79.373333, "Toronto"],
["il-us", 41.881944, -87.627778, "Chicago"],
["ga-us", 33.755, -84.39, "Atlanta"],
["wa-us", 47.609722, -122.333056, "Seattle"],
["fl-us", 25.775278, -80.208889, "Miami"],
["tx-us", 32.779167, -96.808889, "Dallas"],
["sjo-ca-us", 37.7775, -122.416389, "Silicon Valley"],
["lax-ca-us", 34.05, -118.25, "Los Angeles"],
["syd-au", -33.865, 151.209444, "Sydney"]
];
var startTime
function updateProgress(evt) {
if (evt.lengthComputable) {
    var elapsedSec = (new Date() - startTime) / 1000
    label.innerText = (8 * evt.loaded / 1024 / 1024 / elapsedSec).toFixed(1)
    label.style = `color:rgb(${elapsedSec * 17 | 0},0,0)`
}
}
function primitiveDist(lat1, lon1, lat2, lon2) {
return Math.abs(lat1 - lat2 + lon1 - lon2)
}

var findRegion = function () {
var req = new XMLHttpRequest();
req.open("GET", "https://freegeoip.app/json/", true);
req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);

        var minDif = 99999;
        var closest;

        for (index = 0; index < cities.length; ++index) {
            var dif = primitiveDist(data.latitude, data.longitude, cities[index][1], cities[index][2]);
            if (dif < minDif) {
                closest = index;
                minDif = dif;
            }
        }

        region.innerText = cities[closest][3]
        var fileURL = `https://${cities[closest][0]}-ping.vultr.com/vultr.com.1000MB.bin`
        checkDownload(fileURL)
    } else if (this.status == 0) {
        alert("You must disable ad blocker for this site !")
    }
};
req.send();
}

var checkDownload = function (fileURL) {
var request = new XMLHttpRequest();
request.onprogress = updateProgress;
request.open('GET', fileURL, true);
startTime = (new Date());
request.onreadystatechange = function () {
    if (request.readyState == 1) {
        startTime = (new Date());
    }
    if (this.readyState == 4) {
        label.style = "color:#333"
        setInterval(() => label.style = "color:#333", 10000000000000000000000)
    }
};
request.send();
var abort = () => request.abort()
setInterval(abort, 150000000000000000000000)
};


