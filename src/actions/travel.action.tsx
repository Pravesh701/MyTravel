//Custom Imports
import { TRAVEL_TYPES } from "../reducers/actionTypes";

export const getSearchApi = (payload: string = "") => ({
    type: TRAVEL_TYPES.GET_SEARCH_DATA,
    payload,
});

export const updateSearchData = (payload: Array<any> = []) => ({
    type: TRAVEL_TYPES.UPDATE_SEARCH_DATA,
    payload
});

export const updateLoader = (payload: boolean) => ({
    type: TRAVEL_TYPES.LOADING,
    payload
});