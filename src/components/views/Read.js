import React, { Component } from 'react';
import BScroll from 'better-scroll'
import axios from 'axios';
class Read extends Component {
  constructor(){
  	super()
  	this.state={
  		list:[],
      la:false
  	}
  }
  componentDidMount(){
  	this.getData()
    // var wrapper = document.querySelector('.read')
    //不写这个的话 会出现滑到一定距离就滑不动
    setTimeout( () => {
      this.scroll = new BScroll(this.refs.read,{
        //一定要写这三个属性，不然触发不了，scroll方法
        click:true,
        scrollY:true,
        probeType:3
      })
      //scroll方法就是滚动开始是触发
      this.scroll.on("scroll",(ev) => {
        if(ev.y>50){
          let x = this.state.la
          x = true
          this.setState({
            la:x
          })
        }else{
          let x = this.state.la
          x = false
          this.setState({
            la:x
          })
        }
      })
      this.scroll.on("touchEnd",(ev) => {
        if(ev.y>50){
          console.log("下拉刷新成功")
          this.getData()
          let x = this.state.la
          x = false
          this.setState({
            la:x
          })
        }
        if(this.scroll.maxScrollY > ev.y+1){
          console.log("加载更多")
          this.getData()
        }
      })
    },4000)
    
  }
  getData = () => {
      let url = 'https://www.apiopen.top/satinGodApi?type=1&page=1'
      axios.get(url).then((res) => {
      	// console.log(res)
      	this.setState({
      		list:res.data.data
      	})
      	console.log(this.state.list)
      }).catch((error) => {
      	console.log(error)
      })
  	}
  render() {
    return (
      <div className='read' ref='read'>
        <ul className='read_content'>
          <p className={this.state.la ? 'drop-down' : 'unrefresh'}>松手刷新数据</p>
          {
            this.state.list.map((val,key) => {
              if(val.type == 'video'){
              	return(
            	    <li key={key} style={{width:'100%',height:'600'}}>
            	      <div className='read_contain'>
            	      	<span className='header_img'>
            	      		<img src={val.header} style={{width:'40px',height:'40px'}} />
            	      		<div className='val_txt'>
  	          	      		<i>{val.username}</i>
  	          	      		<br/>
  	          	      		<b>{val.passtime}</b>
            	      		</div>
            	      	</span>
            	      </div>
                    <p className='read_text'>{val.text}</p>
            	    	<video style={{width:'400px'}} controls>
                      <source src={val.video} type="video/mp4"/>
                    </video>
            	    </li> 
            	  )
              }
              if(val.type == 'gif'){
              	return(
            	    <li key={key} style={{width:'100%',height:'600'}}>
                    
            	      <div className='read_contain'>
            	      	<span className='header_img'>
            	      		<img src={val.header} style={{width:'40px',height:'40px'}} />
            	      		<div className='val_txt'>
  	          	      		<i>{val.username}</i>
  	          	      		<br/>
  	          	      		<b>{val.passtime}</b>
            	      		</div>
            	      	</span>
            	      </div>
                    <p className='read_text'>{val.text}</p>
            	    	<img src={val.gif} style={{width:'400px'}} />
            	    </li> 
            	  )
              }
              if(val.type == 'image'){
              	return(
            	    <li key={key} style={{width:'100%',height:'600'}}>
                    
            	      <div className='read_contain'>
            	      	<span className='header_img'>
            	      		<img src={val.header} style={{width:'40px',height:'40px'}} />
            	      		<div className='val_txt'>
  	          	      		<i>{val.username}</i>
  	          	      		<br/>
  	          	      		<b>{val.passtime}</b>
            	      		</div>
            	      	</span>
            	      </div>
                    <p className='read_text'>{val.text}</p>
            	    	<img src={val.image} style={{width:'400px'}} />
            	    </li> 
            	  )
              }
            })
          }
        </ul>
      </div>
    );
  }
}

export default Read;
