import React, { ChangeEvent } from 'react';
import { OpenaqService } from '../services/openaq.service';

type LocationSelectorProps = {
  onLocationSelected: Function;
};

class LocationSelector extends React.Component<LocationSelectorProps, any> {
  state = {
    countries: [],
    selectedCountry: '',
    cities: [],
    selectedCity: '',
    locations: [],
  };

  async componentDidMount() {
    let countries = await OpenaqService.getCountries();
    this.setState({
      countries: countries.data.results,
    });
  }

  handleSelectCountry = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    this.setState({
      selectedCountry,
    });
    this.updateCities(selectedCountry);
  };

  updateCities = async (selectedCountry: string) => {
    if (selectedCountry === '') {
      this.setState({
        cities: [],
      });
      return;
    }
    const cities = await OpenaqService.getCities({ country: selectedCountry });
    this.setState({
      cities: cities.data.results,
    });
  };

  handleSelectCity = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
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
    const locations = await OpenaqService.getLocations({ city: selectedCity });
    await this.setState({
      locations: locations.data.results,
    });
  };

  handleSelectLocation = async (event: ChangeEvent<HTMLSelectElement>) => {
    const location = event.target.value;
    if (location === '') {
      return;
    }
    this.props.onLocationSelected(this.state.locations[+location]);
  };

  render() {
    return (
      <div>
        <label>Country</label>
        <div className='field'>
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
        </div>

        <label>City</label>
        <div className='field'>
          <div className='select'>
            <select
              onChange={this.handleSelectCity}
              disabled={this.state.selectedCountry === ''}
            >
              <option value=''>Select a city</option>
              {this.state.cities.map((city: any, index: number) => {
                return (
                  <option key={`${city.name}-${index}`} value={city.name}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <label>Location</label>
        <div className='field'>
          <div className='select'>
            <select
              onChange={this.handleSelectLocation}
              disabled={this.state.selectedCity === ''}
            >
              <option>Select a location</option>
              {this.state.locations.map((location: any, index: number) => {
                return (
                  <option key={location.id} value={index}>
                    {location.location}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationSelector;
