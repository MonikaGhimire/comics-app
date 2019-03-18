import React, { Component } from 'react';
import './App.css';
import logo from './comics-logo.jpeg';
import SearchComics from './component/SearchComics';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="app-header">
      <img src={logo} alt='Logo' className="app-logo"/>
      <h1>Comics Search</h1>
      </header>
      <SearchComics />
      </div>
    );
  }
}

export default App;
