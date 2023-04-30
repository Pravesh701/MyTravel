import { put, call, takeLatest } from "redux-saga/effects";

//Custom Imports
import { flightSearch } from "../services/api";
import { TRAVEL_TYPES } from "../reducers/actionTypes";
import { updateSearchData, updateLoader } from "../actions/travel.action";

type ACTION_TYPES = {
    payload?: string;
    type: string
}

function* travelRequest({ payload = "" }: ACTION_TYPES) {
    try {
        yield put(updateLoader(true));
        const { data } = yield call(flightSearch, payload);
        const { result } = data?.data || {};
        if (result && data?.message === "Success") {
            yield put(updateSearchData(result));
        } else {
            yield put(updateSearchData());
        }
        yield put(updateLoader(false));
    } catch (err) {
        yield put(updateSearchData([]));
        yield put(updateLoader(false));
    }
}

function* watchTravelRequest() {
    yield takeLatest(TRAVEL_TYPES.GET_SEARCH_DATA, travelRequest)
}

export {
    watchTravelRequest
}