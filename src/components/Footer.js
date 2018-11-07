import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Scene from './views/Scene.js'
import Read from './views/Read.js'
import Weather from './views/Weather.js'
import Setting from './views/Setting.js'

import '../asets/css/index.css'
export default class Fotter extends React.Component {
	constructor(){
		super()
    this.state={
      asd:1
    }
	}
  active = (index) => {
    let x = this.state.asd;
    x = index;
    this.setState({
      asd:x
    })
  }
  
	render(){
		return(
      <Router>
      	<div className='footer'>
          <header className='header'>
            <span onClick={this.active.bind(this,1)} className={this.state.asd == 1 ? 'sad' : ''}>
              <Link to='/' className='read_span'>
                <b className='iconfont icon-ai-connection'></b>
                <p>景点</p>
              </Link>
            </span>
            <span className='sad' onClick={this.active.bind(this,2)} className={this.state.asd == 2 ? 'sad' : ''}>
              <Link to='/read' className='read_span'>
                <b className='iconfont icon-yuedureading19'></b>
                <p>阅读</p>
              </Link>
            </span>
            <span onClick={this.active.bind(this,3)} className={this.state.asd == 3 ? 'sad' : ''}>
              <Link to='/weather' className='read_span'>
                <b className='iconfont icon-tianqi'></b>
                <p>天气</p>
              </Link>
            </span>
            <span onClick={this.active.bind(this,4)} className={this.state.asd == 4 ? 'sad' : ''}>
              <Link to='/setting' className='read_span'>
                <b className='iconfont icon-shezhi1'></b>
                <p>设置</p>
              </Link>
            </span>
          </header>
        	<Route exact path='/' component={Scene}></Route>
        	<Route path='/read' component={Read}></Route>
        	<Route path='/weather' component={Weather}></Route>
        	<Route path='/setting' component={Setting}></Route>
       </div>
      </Router>
		)
	}
}