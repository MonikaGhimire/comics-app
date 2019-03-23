import React, { Component } from 'react';
import './Spinner.css';
import { connect } from 'react-redux';

class Spinner extends Component {
    render() {
        if (this.props.loading) {
            return <img className="Loader" src="loading.gif" alt="Loading..." />
        }

        return null;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading
    };
};

export default connect(mapStateToProps)(Spinner);

