import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/main';

class Pagination extends Component {

    getCurrentPageNumber = () => {
        return (this.props.offset / this.props.limit) + 1;
    }

    getTotalPageCount = () => {
        let totalCount = this.props.comicsSearchResult.total;
        return Math.ceil(totalCount / this.props.limit);
    }

    getPageNumbers = () => {
        let totalPages = this.getTotalPageCount();
        if (totalPages === 1) {
            return null;
        }

        let pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        let currentPageNumber = this.getCurrentPageNumber();

        if (totalPages <= 10) {
            return pageNumbers;
        }

        let effectiveTo = 10;
        if (currentPageNumber >= 10 && currentPageNumber < totalPages) {
            effectiveTo = currentPageNumber + 1;
        } else if (currentPageNumber === totalPages) {
            effectiveTo = currentPageNumber;
        }

        let effectiveFrom = effectiveTo - 9;
        pageNumbers = [];
        for (let i = effectiveFrom; i <= effectiveTo; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    updateQueryWithOffset = (offset) => {
        let query = { ...this.props.query };
        query.offset = offset;
        return query;
    }

    handlePageSelect = (pageNumber) => {
        let offset = (pageNumber - 1) * this.props.limit;
        this.props.onPageSelect(offset);
        let query = this.updateQueryWithOffset(offset);
        this.props.pageSelectHandler(query);
    }

    handlePreviousPageClick = () => {
        let offset = this.props.offset - this.props.limit;
        this.props.onPageSelect(offset);
        let query = this.updateQueryWithOffset(offset);
        this.props.pageSelectHandler(query);
    }

    handleNextPageClick = () => {
        let offset = this.props.offset + this.props.limit;
        this.props.onPageSelect(offset);
        let query = this.updateQueryWithOffset(offset);
        this.props.pageSelectHandler(query);
    }

    getPreviousButton = () => {
        if (this.getCurrentPageNumber() > 1) {
            return <li className="page-item"><button onClick={this.handlePreviousPageClick} className="page-link">Previous</button></li>;
        }

        return <li className="page-item disabled"><button className="page-link">Previous</button></li>;
    }

    getNextButton = () => {
        if (this.getCurrentPageNumber() < this.getTotalPageCount()) {
            return <li className="page-item"><button onClick={this.handleNextPageClick} className="page-link" href="/">Next</button></li>;
        }
        return <li className="page-item disabled"><button className="page-link" href="/">Next</button></li>;
    }

    getPageUi = (pageNumber) => {
        if (pageNumber === this.getCurrentPageNumber()) {
            return <li className="page-item disabled" key={pageNumber} id={pageNumber}>
                <button className="page-link" onClick={() => this.handlePageSelect(pageNumber)} >{pageNumber}</button>
            </li>;
        }
        return <li className="page-item" key={pageNumber} id={pageNumber}>
            <button className="page-link" onClick={() => this.handlePageSelect(pageNumber)} >{pageNumber}</button>
        </li>;
    }

    render() {
        let pageNumbers = this.getPageNumbers();
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {this.props.comicsSearchResult.results.length > 0 ? this.getPreviousButton() : null}
                    {this.props.comicsSearchResult.results.length > 0 ? pageNumbers.map(pageNumber => this.getPageUi(pageNumber)) : null}
                    {this.props.comicsSearchResult.results.length > 0 ? this.getNextButton() : null}
                </ul>
            </nav>
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
        onPageSelect: (offset) => dispatch(actions.setSearchResultOffset(offset))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);