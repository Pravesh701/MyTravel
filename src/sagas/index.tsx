import { all, call, fork } from "redux-saga/effects";

import { watchTravelRequest } from "./travelSaga";

export function* rootSaga() {
  yield all([
    fork(watchTravelRequest),
  ]);
}
