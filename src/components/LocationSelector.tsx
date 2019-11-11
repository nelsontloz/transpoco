import React from 'react';
import { OpenaqService } from '../services/openaq.service';
import { InputSelect } from './InputSelect';
import { Country } from '../models/Country.model';
import { City } from '../models/City.model';
import { Location } from '../models/Location.model';

type LocationSelectorProps = {
  onLocationSelected: Function;
};
type LocationSelectorState = {
  countries: Country[];
  cities: City[];
  locations: Location[];
};

class LocationSelector extends React.Component<
  LocationSelectorProps,
  LocationSelectorState
> {
  countriesByName = {} as any;
  selectedCountry = '';
  citiesByName = {} as any;
  selectedCity = '';
  locationsByName = {} as any;

  state = {
    countries: [],
    cities: [],
    locations: [],
  };

  async componentDidMount() {
    let response = await OpenaqService.getCountries();
    const countries: Country[] = response.data.results;
    const countriesByName = {} as any;
    countries.forEach((country: Country) => {
      countriesByName[country.name] = country;
    });
    this.setState({
      countries,
    });
    this.countriesByName = countriesByName;
  }

  handleSelectCountry = async (selectedCountry: string) => {
    this.selectedCountry = '';
    this.citiesByName = {} as any;
    this.selectedCity = '';
    this.locationsByName = {} as any;
    await this.setState({
      cities: [],
      locations: [],
    });
    if (selectedCountry === '') {
      this.props.onLocationSelected(null);
      return;
    }
    this.selectedCountry = selectedCountry;
    this.updateCities(this.countriesByName[selectedCountry].code);
  };

  updateCities = async (selectedCountry: string) => {
    this.setState({
      cities: [],
    });
    if (selectedCountry === '') {
      return;
    }
    const response = await OpenaqService.getCities({
      country: selectedCountry,
    });
    const cities = response.data.results;
    const citiesByName = {} as any;
    cities.forEach((city: City) => {
      citiesByName[city.name] = city;
    });
    this.citiesByName = citiesByName;
    this.setState({
      cities,
    });
  };

  handleSelectCity = async (selectedCity: string) => {
    if (selectedCity === '') {
      this.selectedCity = '';
      this.locationsByName = {} as any;
      this.setState({
        locations: [],
      });
      this.props.onLocationSelected(null);
      return;
    }
    this.selectedCity = selectedCity;
    this.updateLocations(selectedCity);
  };

  updateLocations = async (selectedCity: string) => {
    this.setState({
      locations: [],
    });
    if (selectedCity === '') {
      return;
    }
    const response = await OpenaqService.getLocations({ city: selectedCity });
    const locations: Location[] = response.data.results;
    const locationsByName = {} as any;
    locations.forEach((location: Location) => {
      locationsByName[location.location] = location;
    });

    this.locationsByName = locationsByName;
    this.setState({
      locations: locations,
    });
  };

  handleSelectLocation = async (locationName: string) => {
    if (locationName === '') {
      return;
    }
    this.props.onLocationSelected(this.locationsByName[locationName]);
  };

  render() {
    return (
      <div>
        <label>Country</label>

        <div className='field'>
          <InputSelect
            options={this.state.countries
              .filter((country: Country) => {
                return country.name;
              })
              .map((country: Country) => {
                return country.name as string;
              })}
            onChange={this.handleSelectCountry}
          ></InputSelect>
        </div>

        <label>City</label>
        <div className='field'>
          <InputSelect
            options={this.state.cities.map((city: any) => {
              return city.name;
            })}
            onChange={this.handleSelectCity}
          ></InputSelect>
        </div>

        <label>Location</label>
        <div className='field'>
          <InputSelect
            options={this.state.locations.map((location: Location) => {
              return location.location;
            })}
            onChange={this.handleSelectLocation}
          ></InputSelect>
        </div>
      </div>
    );
  }
}

export default LocationSelector;
