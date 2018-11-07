require.config({
  paths: {　　　　　　
    "amap": "https://webapi.amap.com/maps?v=1.4.8&key=&callback=onAMapLoaded"　　　　
  }　　
});
window.onAMapLoaded = function() {
  require(['initAMap'], function(mapIniter) {
    mapIniter.init();
  })
}
require(['amap'])

define(function() {　　　　
  var init = function() {　　　　　　
    var amap = new AMap.Map('container');
  };　　　　
  return {　　　　　　
    init: init
  };　　
});