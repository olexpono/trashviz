var getMin = function(poly, idx) {
  idx = typeof idx !== 'undefined' ? idx : 0;
  var min = 9999999999;
  poly.forEach(function(point) {
    if(point[idx] < min) {
      min = point[idx];
   }
  });
  return min;
}
var getMax = function(poly, idx) {
  idx = typeof idx !== 'undefined' ? idx : 0;
  var max = -9999999999;
  poly.forEach(function(point) {
    if(point[idx] > max) {
      max = point[idx];
    }
  });
  return max;
}

var getPolygonCenter = function(poly) {
  var minX = getMin(poly, 0);
  var maxX = getMax(poly, 0);

  var minY = getMin(poly, 1);
  var maxY = getMax(poly, 1);

  var centerX = (minX + maxX)/2;
  var centerY = (minY + maxY)/2;
  return [centerX, centerY]
}
/* RESTART */

var toContext = function($el) {
  var c = $el.get(0);
  c.width = $el.height();
  c.height = $el.width();
  return c.getContext('2d');
};


var invertY = function(poly) {
  var out = [];
  poly.forEach(function(point) {
    out.push([point[0], -point[1]])
  });
  return out;
}

var normalizePolygon = function(polygon, center){
  var scale = 12200;
  var norm = [];
  polygon.forEach(function(point) {
    norm.push([scale *(point[0] - center[0]), scale*(point[1] - center[1])]);
  });

  return invertY(norm);
}

var drawPolygon = function($canvas, polygon) {
  var context = toContext($canvas);
  ////console.log(context);
  Sketch.augment(context, {
    fullscreen: false,
    retina: false,
    width: 300,
    height: 300,
    setup: function() {
      this.r = this.g = this.b = Math.random( 100, 200 );
    },

    mousemove: function() {
      this.r = 255 * ( this.mouse.x / this.canvasWidth );
      this.g = 255 * Math.random();
      this.b = 255 * Math.abs( Math.cos( Math.PI * this.mouse.y / this.width ) );
    },

    draw: function() {
      var _sketch = this;
      this.fillStyle = '#212124';
      var center = getPolygonCenter(polygon);
      var normPolygon = normalizePolygon(polygon, center);
      //console.log(normPolygon);
      this.beginPath();
      this.moveTo(150, 150);
      normPolygon.forEach(function(point) {
        _sketch.lineTo(150 + point[0], 150 + point[1]);
      });
      this.fill();
      setTimeout(this.stop, 5);
    }
  });
}

var reverseXY = function(poly) {
  var out = [];
  poly.forEach(function(point){
    out.push([point[1], point[0]]);
  });
  return out;
};

/* Renders each feature into its corresponding canvas.
 * Assumes that each feature has a div with a canvas
 * div must have id "landfill-<id>"
 */
var renderPolygons = function(features) {
  //console.log("Rendering features ", features);
  features.forEach(function(feature) {
    var id = feature["properties"]["id"];
    var coords = feature["geometry"]["coordinates"][0];
    //console.log("rendering #landfill-"+ id);
    drawPolygon($("#landfill-" + id + " canvas"), coords);
  });
}

$(function() {
  var landfilldata = $.ajax("/landfills.json", {
    success: function (data) {
      renderPolygons(data);
    }
  });
  // drawPolygon(canvas1, poly2);
});
