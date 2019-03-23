import * as actions from '../actions/main';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchComicsSaga(action) {
    let url = 'http://localhost:8000/marvelapi/public/comics?';
    let searchQuery = action.query;
    let titleStartsWith = searchQuery.titleStartsWith;
    let creators = searchQuery.creators;
    let characters = searchQuery.characters;
    let startYear = searchQuery.startYear;
    let format = searchQuery.format;

    url += `limit=${searchQuery.limit}`;
    url += `&offset=${searchQuery.offset}`;

    if (titleStartsWith !== null && titleStartsWith.trim() !== '') {
        url += `&titleStartsWith=${titleStartsWith}`;
    }

    if (creators !== null && creators.trim() !== '') {
        url += `&creators=${creators}`;
    }

    if (characters !== null && characters.trim() !== '') {
        url += `&characters=${characters}`;
    }

    if (startYear !== null && startYear.trim() !== '') {
        url += `&startYear=${startYear}`;
    }

    if (format !== null && format.trim() !== '') {
        url += `&format=${format}`;
    }

    yield put(actions.fetchComicsStart());
    try {
        const response = yield axios.get(url)
        yield put(actions.fetchComicsSuccess(response.data.data));
    } catch (error) {
        yield put(actions.fetchComicsFail('Error while fetching comics!'));
    }
}

export function* fetchComicDetailsSaga(action) {
    let url = `http://localhost:8000/marvelapi/public/comics/${action.comicId}`;
    yield put(actions.fetchComicDetailsStart());
    try {
        const response = yield axios.get(url)
        let comicDetails = {};
        if (response.data.data.results) {
            comicDetails = response.data.data.results[0];
        }
        yield put(actions.fetchComicDetailsSuccess(comicDetails));
    } catch (error) {
        yield put(actions.fetchComicDetailsFail('Error while fetching comic details!'));
    }
}
