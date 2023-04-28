import { all, call, fork } from "redux-saga/effects";

import { watchTravelRequest } from "./homeSaga";

export function* rootSaga() {
  yield all([
    fork(watchTravelRequest),
  ]);
}
