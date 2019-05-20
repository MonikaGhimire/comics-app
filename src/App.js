import React, { Component } from 'react';
import './App.css';
import logo from './images/comics-logo.jpeg';
import SearchComics from './container/Comics/SearchComics';
import ComicDetails from './container/Comics/ComicDetails';
import { Switch, Route } from 'react-router-dom';
import Spinner from './component/Spinner/Spinner';
import Notification from './component/Notification/Notification';

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
          <Notification />
        <Spinner />
        {routes}
      </div>
    );
  }
}

export default App;
