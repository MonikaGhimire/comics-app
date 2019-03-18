import React, { Component } from 'react';
import './SearchComics.scss';

class SearchComics extends Component {
    render() {
        return (
            <div className="searchComponent">
                <input type="text" className="form-control searchComics" id="inputSearch" placeholder="Search Books" />
                <button className="btn btn-info btn-search">Search</button>
            </div>
        );
    }
}

export default SearchComics;