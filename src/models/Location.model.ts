export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface CountsByMeasurement {
  parameter: string;
  count: number;
}

export interface Location {
  id: string;
  country: string;
  city: string;
  cities: string[];
  location: string;
  locations: string[];
  sourceName: string;
  sourceNames: string[];
  sourceType: string;
  sourceTypes: string[];
  coordinates: Coordinates;
  firstUpdated: string;
  lastUpdated: string;
  parameters: string[];
  countsByMeasurement: CountsByMeasurement[];
  count: number;
}
