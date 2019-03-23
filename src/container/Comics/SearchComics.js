import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchComics.scss';
import { NavLink } from 'react-router-dom';
import * as actions from '../../actions/main';
import Paginate from '../../component/Pagination/Pagination';

class SearchComics extends Component {
    state = {
        query: {
            titleStartsWith: '',
            creators: '',
            characters: '',
            startYear: '',
            format: '',
            offset: this.props.offset,
            limit: this.props.limit
        }
    }

    componentDidMount() {
        this.props.onFetchComics(this.state.query);
    }

    truncateDescription = (description) => {
        if (description) {
            return description.length > 200 ? description.substring(0, 200) + '...' : description;
        }

        return '';
    };

    handlePageSelect = (query) => {
        this.setState({ query: query });
        this.props.onFetchComics(query);
    };

    handleChange = (event) => {
        let query = { ...this.state.query };
        query[event.target.name] = event.target.value;
        this.setState({ query: query });
    };

    render() {
        return (
            <div className="Container-body">
                <div>
                    <input onChange={(event) => this.handleChange(event)}
                        type="text" className="form-control searchComics"
                        id="inputSearch" placeholder="Search Comics by Title" name="titleStartsWith" />
                    <div className="form-inline InputComponent">
                        <select onChange={(event) => this.handleChange(event)}
                            className="form-control searchComics"
                            id="exampleFormControlSelect1 inputSearch" name="format">
                            <option value="">Select format</option>
                            <option>comic</option>
                            <option>magazine</option>
                            <option>trade paperback</option>
                            <option>hardcover</option>
                            <option>digest</option>
                            <option>graphic novel</option>
                            <option>digital comic</option>
                            <option>infinite comic</option>
                        </select>

                        <input type="text" onChange={(event) => this.handleChange(event)}
                            className="form-control searchComics" placeholder="Start Year" name="startYear" />

                        <input onChange={(event) => this.handleChange(event)}
                            type="text" className="form-control searchComics"
                            id="inputSearch" placeholder="Creator Ids" name="creators" />

                        <input onChange={(event) => this.handleChange(event)}
                            type="text" className="form-control searchComics"
                            id="inputSearch" placeholder="Character IDs" name="characters" />
                    </div>

                    <button className="btn btn-info btn-search"
                        onClick={() => this.props.onFetchComics(this.state.query)}>Search</button>
                </div>

                <div>
                    {this.props.comicsSearchResult.count > 0 ? <p
                        className="results-count">Showing {this.props.comicsSearchResult.count} out of {this.props.comicsSearchResult.total} results..</p> : 'No results found!..'}
                    <div className="card-container">
                        {this.props.comicsSearchResult.results.map(result => (
                            <div className="comics-card" key={result.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{result.title}</h5>
                                    <p className="card-text">{this.truncateDescription(result.description)}</p>

                                    <NavLink to={`/${result.id}`}>
                                        <button className="btn btn-primary" onClick={() => this.props.onFetchComicDetails(result.id)}>View Details</button>
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {<Paginate query={this.state.query} pageSelectHandler={this.handlePageSelect} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        comicsSearchResult: state.comicsSearchResult,
        loading: state.loading,
        offset: state.offset,
        limit: state.limit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchComics: (query) => dispatch(actions.fetchComics(query)),
        onFetchComicDetails: (comicId) => dispatch(actions.fetchComicDetails(comicId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComics);