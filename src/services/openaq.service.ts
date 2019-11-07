import Axios from 'axios';

interface ApiPagination {
  sort?: string[];
  limit?: number;
  page?: number;
}

interface CountriesOptions extends ApiPagination {
  order_by?: string[];
}

interface CitiesOptions extends ApiPagination {
  country?: string;
  order_by?: string[];
}

interface LocationOptions extends ApiPagination {
  city?: string;
  country?: string;
  location?: string;
  parameter?: string;
}

interface MeasurementsOptions extends ApiPagination {
  location?: string;
  date_from?: string;
  date_to?: string;
  parameter?: string;
}

const BASE_API_URL = 'https://api.openaq.org/v1';

export const OpenaqService = {
  getCountries: (options?: CountriesOptions) => {
    return Axios.get(`${BASE_API_URL}/countries`, { params: options });
  },

  getCities: (options?: CitiesOptions) => {
    return Axios.get(`${BASE_API_URL}/cities`, {
      params: options,
    });
  },
  getLocations: (options?: LocationOptions) => {
    return Axios.get(`${BASE_API_URL}/locations`, {
      params: options,
    });
  },
  getMeasurements: (options?: MeasurementsOptions) => {
    return Axios.get(`${BASE_API_URL}/measurements`, {
      params: options,
    });
  },
};
