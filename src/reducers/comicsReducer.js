import * as ActionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
    comicsSearchResult: {
        results: []
    },
    loading: false,
    comicDetails: {},
    offset: 0,
    limit: 20
};

const onFetchComicsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const onFetchComics = (state, action) => {
    return updateObject(state, {
        comicsSearchResult: action.comicsSearchResult,
        loading: false,
        offset: action.comicsSearchResult.offset
    });
};

const onFetchComicsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        comicsSearchResult: {
            results: []
        }
    });
};

const onFetchComicDetailsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const onFetchComicDetails = (state, action) => {
    return updateObject(state, {
        comicDetails: action.comicDetails,
        loading: false
    });
};

const onFetchComicDetailsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const onSetSearchResultOffset = (state, action) => {
    return updateObject(state, {
        offset: action.offset
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_COMICS_START: return onFetchComicsStart(state, action);

        case ActionTypes.FETCH_COMICS_SUCCESS: return onFetchComics(state, action);

        case ActionTypes.FETCH_COMICS_FAIL: return onFetchComicsFail(state, action);

        case ActionTypes.FETCH_COMIC_DETAILS_START: return onFetchComicDetailsStart(state, action);

        case ActionTypes.FETCH_COMIC_DETAILS_SUCCESS: return onFetchComicDetails(state, action);

        case ActionTypes.FETCH_COMIC_DETAILS_FAIL: return onFetchComicDetailsFail(state, action);

        case ActionTypes.SET_SEARCH_RESULT_OFFSET: return onSetSearchResultOffset(state, action);

        default: return state;
    }
}

export default reducer;