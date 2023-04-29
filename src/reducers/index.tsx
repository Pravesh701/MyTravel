import { combineReducers } from 'redux'
import travelReducer from "./travelReducer";

export default combineReducers({
  travel: travelReducer,
})