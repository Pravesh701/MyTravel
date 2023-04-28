
import {
    SET_SELECTED_CONTACT,
    SET_SELECTED_CONTACT_SUCCESS,
} from "./actionTypes";

const initState = {
    selectedContact: undefined,
};

export const actions = {
    setSelectedContact(customer: any) {
        return {
            type: SET_SELECTED_CONTACT,
            payload: customer,
        };
    },
};

const reducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_SELECTED_CONTACT: {
            return {
                ...state,
                selectedContact: action.payload,
            };
        }
        case SET_SELECTED_CONTACT_SUCCESS: {
            return initState;
        }

        default:
            return state;
    }
};
reducer.initialState = initState;
export default reducer;

