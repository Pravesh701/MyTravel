const root = (state: any) => state.travel;

export const travelDataSelector = (state: any) => root(state)?.travelData;
