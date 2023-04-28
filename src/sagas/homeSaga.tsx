import { put, call, all, select, takeLatest } from "redux-saga/effects";

//Custom Imports
// import {  travelRequestConfig } from "../services/api";
import { SET_CONTACT_PERMISSION_STATUS_SUCCESS } from "../reducers/actionTypes";
import { travelDataSelector } from "../selectors/travel.selector";

function* travelRequest() {
    try {
        // const { api = {} } = yield select(travelDataSelector);
        // const { fetched = false } = api || {};
        // const { data } = yield call(travelRequestConfig);
        // yield put(getTravelRequestType.getTravelRequestType.success(data, ""));
        // if (!fetched)
        //     yield put(getTravelRequestType.getTravelRequestType.fetched({}, ""));
    } catch (err) {
        // yield put(getTravelRequestType.getTravelRequestType.error({ err }, ""));
    }
}

function* watchTravelRequest() {
    yield takeLatest(SET_CONTACT_PERMISSION_STATUS_SUCCESS,
        travelRequest,);
}

export {
    watchTravelRequest
}