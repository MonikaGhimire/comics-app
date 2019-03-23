import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
    if (props.display) {
        return (
                <label style={{
                    color: 'red',
                    fontSize: '15px',
                    marginLeft: '30px',
                    marginBottom: '-25px',
                    textAlign: 'center'
                }}>{props.errorMessage}</label>
        );
    };

    return null;
}

const mapStateToProps = state => {
    return {
        errorMessage: state.error,
        display: state.display
    }
}

export default connect(mapStateToProps)(Notification);