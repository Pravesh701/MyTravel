//Custom Imports
import { RootState } from "../reducers";

const root = (state: RootState) => state.travel;

export const searchResultsSelector = (state: RootState) => root(state)?.searchResults;