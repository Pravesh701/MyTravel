import {
    TRAVEL_TYPES,
} from "./actionTypes";

const initState = {
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

