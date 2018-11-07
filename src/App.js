import React, { Component } from 'react';
import Footer from './components/Footer.js';
import './asets/css/index.css';
class App extends Component {
  render() {
    return (
      <div className="app">
        <h2>找厕所APP</h2>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
