
export type airportType = {
    cityCode: string;
    cityName: string;
    terminal: string;
    airportCode: string;
    airportName: string;
    countryCode: string;
    countryName: string;
}

export type airlinesItems = {
    airlineCode: string;
    airlineName: string;
    flightNumber: string;
}

export type destinationType = {
    airport: airportType;
    arrTime: string;
}

export type displayDataType = {
    source: {
        airport: airportType;
        depTime: string;
    };
    airlines: Array<airlinesItems>;
    stopInfo: string;
    destination: destinationType;
    totalDuration: string;
}

export type travelSearchItemsType = {
    id: string;
    fare: number;
    displayData: displayDataType;
}