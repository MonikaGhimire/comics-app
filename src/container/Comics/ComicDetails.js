import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/main';
import './ComicDetails.scss';

class ComicDetails extends Component {
    state = {}

    componentDidMount() {
        this.props.onFetchDetails(this.props.match.params.comicId);
    };

    onReadComicButtonClick = () => {
        let urls = this.props.comicDetails.urls;

        if (urls && urls.length > 0) {
            window.open(urls[0].url, '_blank');
        }

        return null;
    };

    getCreators = () => {
        let creators = this.props.comicDetails.creators;
        if (creators && creators.items && creators.items.length > 0) {
            return <p> Creators:<label>&nbsp;</label>
                {creators.items.map((creator, index) => index === creators.items.length - 1 ? <label key={index}>{creator.name}</label> : <label key={index}>{creator.name},&nbsp;</label>)}
            </p>;
        }

        return null;
    };

    getModifiedDate = () => {
        let modifiedDate = this.props.comicDetails.modified
        let formattedDate = new Date(modifiedDate);
        return <p>Modified Date: {formattedDate.toLocaleDateString()}</p>
    };

    render() {
        return (
            <div className="Details-container">
                <h2 className="details-heading">{this.props.comicDetails.title}</h2>
                {this.getCreators()}
                <p>Type: {this.props.comicDetails.format}</p>
                {this.props.comicDetails.description ? <p>{this.props.comicDetails.description}</p> : null}
                {this.props.comicDetails.isbn ? <p>ISBN: {this.props.comicDetails.isbn}</p> : null}
                <p>Issue Number: {this.props.comicDetails.issueNumber}</p>
                {this.getModifiedDate()}
                <p>Total Pages: {this.props.comicDetails.pageCount}</p>
                <button onClick={this.onReadComicButtonClick} className="btn btn-primary">Read Now</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        comicDetails: state.comicDetails,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDetails: (comicId) => dispatch(actions.fetchComicDetails(comicId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicDetails);