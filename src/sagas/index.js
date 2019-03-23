import { takeEvery } from 'redux-saga/effects';
import { fetchComicsSaga, fetchComicDetailsSaga } from './comicsSaga';
import * as ActionTypes from '../actions/actionTypes';

export function* watchComics() {
    yield takeEvery(ActionTypes.FETCH_COMICS_SAGA, fetchComicsSaga);
    yield takeEvery(ActionTypes.FETCH_COMIC_DETAILS_SAGA, fetchComicDetailsSaga);
};