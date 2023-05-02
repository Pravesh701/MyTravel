import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

//Custom Imports
import reducers from "../reducers";
import { rootSaga } from "../sagas";
import loggerMiddleware from '../middlewares/logger';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, loggerMiddleware];
const store = createStore(
  reducers,
  {},
  applyMiddleware(...middleware),
);
sagaMiddleware.run(rootSaga);
export default store;
