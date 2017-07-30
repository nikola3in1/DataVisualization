var mapimg;

var clat = 13;//13 45
var clon = 45;

var ww = 1280;
var hh = 880;

var zoom = 0;
var earthquakes;

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clat + ',' + clon + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
  // earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
  earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
  clon = clon -45;
  clat = clat -13;
}
function setup(){
  createCanvas(ww,hh);
  background(51, 0, 0);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);


 var cx = mercX(clon+13);//10
  var cy = mercY(clat+45);//43.5
  console.log(clon,clat);
 for (var i = 1; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    //console.log(data);
    var lat = data[1];//44.791774;
    var lon = data[2];//20.430826
    var mag = data[4];
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    mag = pow(10, mag);
    mag = sqrt(mag);
    var magmax = sqrt(pow(10, 10));
    var d = map(mag, 0, magmax, 0, 180);
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d+1,d+1);
   }

}

function draw(){
}

function mercX(lon) {
  lon = radians(lon);
  var a = (640 / PI) * pow(2, 0);//640
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (643 / PI) * pow(2, 0);//660
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}
