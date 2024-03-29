var mapimg;
var clat = 13;
var clon = 45;
var ww = 1280;
var hh = 880;
var zoom = 0;
var earthquakesData;
var wildFireData;
var canvas;
var isDrawnEq=false;
var isDrawnWf=false;
var isDrawnV=false;

var isDrawing=false;

var btnEq;
var btnWf;
var btnV;
var btnR;

var counter=0;

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/13,45,0/1280x880?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
  earthquakesData = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
  clon = clon -45;
  clat = clat -13;
}
  // wildFireData= httpPost('https://firms.modaps.eosdis.nasa.gov/active_fire/c6/text/MODIS_C6_Global_24h.csv',params,finished);
  //wildFireData = loadStrings('https://firms.modaps.eosdis.nasa.gov/active_fire/c6/text/MODIS_C6_Global_24h.csv');


  function setup(){
    canvas = createCanvas(ww,hh);
    translate(width / 2, height / 2);
    imageMode(CENTER);
    image(mapimg, 0, 0);
    btnEq= select("#btnEq");
    btnWf= select("#btnWf");
    btnV= select("#btnV");
    btnR= select("#btnR");

    translate(width / 2*-1, height / 2*-1);
    drawEarthQuakes();
    btnEq.mousePressed(function(){
      if(!isDrawing){
        if(!isDrawnEq){drawEarthQuakes();}
        else{clearCanvas();}
      }
      setInterval(count,20);
    });
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

/*function mousePressed(){
  if(isDrawnEq){
    canvas.clear();
    translate(width / 2, height / 2);
    imageMode(CENTER);
    image(mapimg,0,0);
    isDrawnEq=false;
  }else{
      translate(width / 2, height / 2);
      drawEarthQuakes();
      isDrawnEq=true;
  }
}*/

function count(){
  counter++;
  if(counter>=20){ isDrawing=false; counter*=0;}
}

function drawEarthQuakes(){
  isDrawing=true;
  if(!isDrawnEq){
    translate(width / 2, height / 2);
    var cx = mercX(clon+13);
    var cy = mercY(clat+45);
    for (var i = 1; i < earthquakesData.length; i++) {
      var data = earthquakesData[i].split(/,/);
      var lat = data[1];//44.791774;
      var lon = data[2];//20.430826
      var mag = data[4];
      var x = mercX(lon) - cx;
      var y = mercY(lat) - cy;
      mag = pow(mag,10);
      mag = sqrt(mag);
      var magmax = sqrt(pow(10, 10));
      var d = map(mag, 0, magmax, 0, 180);
      stroke(230, 0,0);
      fill(255, 0, 255, 0.8);
      ellipse(x, y, d+3,d+3);
    }
    console.log("done drawing");
  }
  isDrawnEq=true;
  console.log("should be enabled");
}
function drawWildFire(){
  var cx = mercX(clon+13);
  var cy = mercY(clat+45);
  for (var i = 1; i < wildFireData.length; i++) {
    var data = wildFireData[i].split(/,/);
    var lat = data[0];//44.791774;
    var lon = data[1];//20.430826
    var mag = data[4];
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    mag = pow(10, mag);
    mag = sqrt(mag);
    var magmax = sqrt(pow(10, 10));
    var d = map(mag, 0, magmax, 0, 180);
    stroke(230, 0,0);
    fill(255, 255, 255, 0.8);
    ellipse(x, y, d+3,d+3);
  }
}
function clearCanvas(){
 console.log("clear");
 canvas.clear();
 translate(width / 2, height / 2);
 imageMode(CENTER);
 image(mapimg,0,0);
 isDrawnEq=false;
}