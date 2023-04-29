import {
    TRAVEL_TYPES,
} from "./actionTypes";
import { travelSearchItemsType } from "../types/travelSearchDataTypes";

type travelData = {
    searchResults: Array<travelSearchItemsType>
}

const initState: travelData = {
    searchResults: [],
};

const reducer = (state = initState, action: any) => {
    switch (action.type) {
        case TRAVEL_TYPES.UPDATE_SEARCH_DATA: {
            return {
                ...state,
                searchResults: action.payload,
            };
        }
        default:
            return state;
    }
};
reducer.initialState = initState;
export default reducer;

