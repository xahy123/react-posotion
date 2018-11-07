import React, { Component } from 'react';
import axios from 'axios';
import BScroll from 'better-scroll'
class Weather extends Component {
	constructor(){
  		super()
  		this.state={
  			list:[],
  			yes:''
  		}
  	}
  	componentDidMount(){
  	  this.getWeather()
  	  var wrapper = document.querySelector('.wrapper')
      var scroll = new BScroll(wrapper)
    }
  	getWeather = () => {
  		let url = 'https://www.apiopen.top/weatherApi?city=%E6%88%90%E9%83%BD'
  		axios.get(url).then((res) => {
  			console.log(res)
  			this.setState({
  				list:res.data.data.forecast,
  				yes:res.data.data.yesterday
  			})
  		}).catch((error) => {
  			console.log(error)
  		})
  	}
  render() {
    return (
      <div className='weather'>
        <div className='weather_city'>
        	<p>所在地区：武汉</p>
        </div>
        <div className='wrapper'>
        	<ul className='content'>
        		<li>
        		  <div className='yesterday'>
        		    <div className='weather_type'>
        		      <p>昨天•{this.state.yes.date}</p>
        		      <p>{this.state.yes.type}</p>
        		    </div>
        		    <br/>
        		    <div className='weather_t'>
        		      <p>{this.state.yes.high}/{this.state.yes.low}</p>
        		    </div>
        		    <br/>
        		    <p className='weather_f'>{this.state.yes.fl}/{this.state.yes.fx}</p>
        		  </div>
        		</li>
        		{
              this.state.list.map((val,key) => {
                return(
                  <li key={key}>
	                	<div className='yesterday'>
	                 	  <div className='weather_type'>
	                 	    <p>{val.date}</p>
	                 	    <p>{val.type}</p>
	                 	  </div>
	                 	  <br/>
	                 	  <div className='weather_t'>
	                 	    <p>{val.high}/{val.low}</p>
	                 	  </div>
	                 	  <br/>
	                 	  <p className='weather_f'>{val.fengli}/{val.fengxiang}</p>
	                	</div>
                  </li>	 
                )
              })
            }
        	</ul>
        </div>
      </div>
    );
  }
}

export default Weather;
