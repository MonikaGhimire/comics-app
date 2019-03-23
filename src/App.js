import React, { Component } from 'react';
import './App.css';
import logo from './comics-logo.jpeg';
import SearchComics from './container/Comics/SearchComics';
import ComicDetails from './container/Comics/ComicDetails';
import { Switch, Route } from 'react-router-dom';
import Spinner from './component/Spinner/Spinner';

class App extends Component {
  render() {
    let routes = (
      <Switch>
          <Route path='/' exact component={SearchComics} />
          <Route path='/:comicId' component={ComicDetails} />
      </Switch>
    );
    return (
      <div className="App">
        <header className="app-header">
          <div className="heading">
            <img src={logo} alt='Logo' className="app-logo" />
            <h3 className="comic-header">Comics Search</h3>
          </div>
        </header>
        <Spinner />
        {routes}
      </div>
    );
  }
}

export default App;
