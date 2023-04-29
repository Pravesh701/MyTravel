import { combineReducers } from 'redux'
import travelReducer from "./travelReducer";

const rootReducer = combineReducers({
  travel: travelReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;


