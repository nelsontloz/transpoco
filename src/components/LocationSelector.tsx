import React, { ChangeEvent } from 'react';
import { OpenaqService } from '../services/openaq.service';
import { InputSelect } from './InputSelect';
import { Country } from '../models/Country.model';
import { City } from '../models/City.model';
import { Location } from '../models/Location.model';

type LocationSelectorProps = {
  onLocationSelected: Function;
};

class LocationSelector extends React.Component<LocationSelectorProps, any> {
  state = {
    countries: [],
    countriesByName: {} as any,
    selectedCountry: '',
    cities: [],
    citiesByName: {} as any,
    selectedCity: '',
    locations: [],
    locationsByName: {} as any,
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
      countriesByName,
    });
  }

  handleSelectCountry = async (selectedCountry: string) => {
    this.setState({
      selectedCountry,
    });
    this.updateCities(this.state.countriesByName[selectedCountry].code);
  };

  updateCities = async (selectedCountry: string) => {
    if (selectedCountry === '') {
      this.setState({
        cities: [],
      });
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
    this.setState({
      cities,
      citiesByName,
    });
  };

  handleSelectCity = async (selectedCity: string) => {
    this.setState({ selectedCity });
    this.updateLocations(selectedCity);
  };

  updateLocations = async (selectedCity: string) => {
    if (selectedCity === '') {
      this.setState({
        locations: [],
      });
      return;
    }
    const response = await OpenaqService.getLocations({ city: selectedCity });
    const locations: Location[] = response.data.results;
    const locationsByName = {} as any;
    locations.forEach((location: Location) => {
      locationsByName[location.location] = location;
    });
    await this.setState({
      locations: locations.map((location: Location) => {
        return location.location;
      }),
      locationsByName,
    });
  };

  handleSelectLocation = async (locationName: string) => {
    if (locationName === '') {
      return;
    }
    this.props.onLocationSelected(this.state.locationsByName[locationName]);
  };

  render() {
    return (
      <div>
        <label>Country</label>

        <div className='field'>
          <InputSelect
            options={this.state.countries
              .filter((country: any) => {
                return country.name;
              })
              .map((country: any) => {
                return country.name as string;
              })}
            onChange={this.handleSelectCountry}
          ></InputSelect>
        </div>

        {/* <div className='field'>
          <div className='select'>
            <select onChange={this.handleSelectCountry}>
              <option value=''>Select a country</option>
              {this.state.countries
                .filter((country: any) => {
                  return country.name;
                })
                .map((country: any, index: number) => {
                  return (
                    <option
                      key={`${country.code}-${index}`}
                      value={country.code}
                    >
                      {country.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div> */}

        <label>City</label>
        <div className='field'>
          <InputSelect
            options={this.state.cities.map((city: any) => {
              return city.name;
            })}
            onChange={this.handleSelectCity}
          ></InputSelect>

          {/* <div className='select'>
            <select
              onChange={this.handleSelectCity}
              disabled={this.state.selectedCountry === ''}
            >
              <option value=''>Select a city</option>
              {}
            </select>
          </div> */}
        </div>

        <label>Location</label>
        <div className='field'>
          <InputSelect
            options={this.state.locations}
            onChange={this.handleSelectLocation}
          ></InputSelect>
        </div>
      </div>
    );
  }
}

export default LocationSelector;
