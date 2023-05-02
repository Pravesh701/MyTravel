//Custom Imports
import { RootState } from "../reducers";

const root = (state: RootState) => state.travel;

export const loaderSelector = (state: RootState) => root(state)?.loader;
export const searchResultsSelector = (state: RootState) => root(state)?.searchResults;
