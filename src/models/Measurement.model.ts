export interface Dates {
    utc: string;
    local: string;
}

export interface Coordinates {
    longitude: number;
    latitude: number;
}

export interface Measurement {
    location: string;
    parameter: string;
    date: Dates;
    value: number;
    unit: string;
    coordinates: Coordinates;
    country: string;
    city: string;
}