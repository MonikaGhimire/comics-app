import * as ActionTypes from './actionTypes';

export const fetchComicsStart = () => {
    return {
        type: ActionTypes.FETCH_COMICS_START
    }
}

export const fetchComicsSuccess = (comicsSearchResult) => {
    return {
        type: ActionTypes.FETCH_COMICS_SUCCESS,
        comicsSearchResult: comicsSearchResult
    };
};

export const fetchComicsFail = (errorMessage) => {
    return {
        type: ActionTypes.FETCH_COMICS_FAIL,
        error: errorMessage
    }
}

export const fetchComics = (query) => {
    return {
        type: ActionTypes.FETCH_COMICS_SAGA,
        query: query
    };
};

export const fetchComicDetailsStart = () => {
    return {
        type: ActionTypes.FETCH_COMIC_DETAILS_START
    }
}

export const fetchComicDetailsSuccess = (comicDetails) => {
    return {
        type: ActionTypes.FETCH_COMIC_DETAILS_SUCCESS,
        comicDetails: comicDetails
    };
};

export const fetchComicDetailsFail = (errorMessage) => {
    return {
        type: ActionTypes.FETCH_COMIC_DETAILS_FAIL,
        error: errorMessage
    }
}

export const fetchComicDetails = (comicId) => {
    return {
        type: ActionTypes.FETCH_COMIC_DETAILS_SAGA,
        comicId: comicId
    };
};

export const setSearchResultOffset = (offset) => {
    return {
        type: ActionTypes.SET_SEARCH_RESULT_OFFSET,
        offset: offset
    };
};