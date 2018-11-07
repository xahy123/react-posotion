import React, { Component } from 'react';
import '../../asets/css/index.css';
// import { Map, Marker } from 'react-amap';
const AMap = window.AMap;
class Scene extends Component {
  constructor(){
  	super()
  	
  }
  componentDidMount(){
  	let map = new AMap.Map("container", {
      resizeEnable: true,
      zoom:13
    });

    clickOn()
    //工具显示
    AMap.plugin([
        'AMap.ToolBar','AMap.Scale','AMap.MapType'
    ], function(){
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.addControl(new AMap.ToolBar({
            // 简易缩放模式，默认为 false
            liteStyle: true
        }));
        map.addControl(new AMap.Scale({
            // 简易缩放模式，默认为 false
            liteStyle: true
        }));
        map.addControl(new AMap.MapType({
            // 简易缩放模式，默认为 false
            liteStyle: true
        }));
    });


    //定位
    AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            buttonPosition:'RB',    //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点


        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status,result){
            if(status=='complete'){
                onComplete(result)
                // 
            }else{
                console.log(result)
            }
        });
    });
    //解析定位结果
    function onComplete(data) {
        // document.getElementById('status').innerHTML='定位成功'
        var str = [];
        str.push('定位结果：' + data.position);
        // document.getElementById('result').innerHTML = str.join('<br>');
    }
     function showInfoClick(e){
        // var text = e.lnglat.getLng()+','+e.lnglat.getLat()
        // document.querySelector("#text").innerHTML = text;
        //绘制路线
      let walking = new AMap.Walking({
        map: map,
      });
      walking.search([114.424259,30.456326], [e.lnglat.getLng(),e.lnglat.getLat()], function(status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
            console.log('绘制步行路线完成')
        }
      });
    }
    // 事件绑定 有这个才能绘制地图
    function clickOn(){
        map.on('click', showInfoClick);
    }
    
  	AMap.service(["AMap.PlaceSearch"], function() {
      //构造地点查询类
      var placeSearch = new AMap.PlaceSearch({
        pageSize: 2,
        pageIndex: 2, 
        city: "027", // 兴趣点城市
        citylimit: true,  //是否强制限制在设置的城市内搜索
        map: map, // 展现结果的地图实例
        panel: "panel", 
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      });
      //关键字查询
      placeSearch.search('厕所', function (status, result) {
      // 查询成功时，result即对应匹配的POI信息
      console.log(result)
      var pois = result.poiList.pois;
        for(var i = 0; i < pois.length; i++){
          var poi = pois[i];
          var marker = [];
          marker[i] = new AMap.Marker({
              position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: poi.name
          });
          // 将创建的点标记添加到已有的地图实例：
          map.add(marker[i]);
        }
        map.setFitView();
      })
    });
  }
  render() {
    return (
      <div id='container'>
      <div id="panel"></div>
      {/*<div className="info">
        <h4 id='status'>还未定位</h4><hr/>
        <p id='result'></p><hr/>
        <p id='text'></p><hr/>
      </div>*/}
       {/*<div className="input-item">
        <button id="clickOn" class="btn">绑定事件</button>
        <button id="clickOff" class="btn">解绑事件</button>
      </div>*/}
       {/*<div className="info">
         <h4>结果展示</h4>
         <p><span id="input-info"></span></p>
       </div>*/}
       {/*<Map amapkey={'11ac64db1038920ae7ce66195c201718'} plugins={plugins}>
        	<Marker><div style={styleC}></div></Marker>
        </Map>*/}
        {/*<div className="input-card">
          <label style={{color:'grey'}}>公交站点查询</label>
          <div className="input-item">
            <div className="input-item-prepend"><span className="input-item-text" >站名</span></div>
            <input id='stationKeyWord' type="text" value={this.state.title} onChange={this.change}/>
          </div>
          <input id="search" type="button" className="btn" value="查询" />
        </div>*/}
      </div>
    );
  }
}

export default Scene;
