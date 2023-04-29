const root = (state: any) => state.travel;

export const searchResultsSelector = (state: any) => root(state)?.searchResults;
