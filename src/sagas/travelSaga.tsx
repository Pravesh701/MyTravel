import { put, call, all, select, takeLatest, debounce } from "redux-saga/effects";

//Custom Imports
import { flightSearch } from "../services/api";
import { TRAVEL_TYPES } from "../reducers/actionTypes";
import { updateSearchData } from "../actions/travel.action";

function* travelRequest(action: any) {
    console.log('action', action);
    try {
        const { data } = yield call(flightSearch, action?.payload || "");
        const { result } = data?.data || {};
        if (result && data?.message === "Success") {
            yield put(updateSearchData(result));
        } else {
            yield put(updateSearchData());
        }
    } catch (err) {
        yield put(updateSearchData([]));
    }
}

function* watchTravelRequest() {
    yield debounce(1000, TRAVEL_TYPES.GET_SEARCH_DATA, travelRequest)
}

export {
    watchTravelRequest
}