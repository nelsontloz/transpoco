import React, { ChangeEvent } from 'react';
import './App.scss';
import Chart from './components/chart';
import dayjs from 'dayjs';
import LocationSelector from './components/LocationSelector';
import { OpenaqService } from './services/openaq.service';
import { Measurement } from './models/Measurement.model';
import { Location } from './models/Location.model';

type AppState = {
  measurements: Measurement[];
  labels: string[];
};
class App extends React.Component<any, AppState> {
  selectedParameter = 'so2';
  selectedLocation = null as any;
  state = {
    measurements: [],
    labels: [],
  };

  handleLocationSelected = (location: Location) => {
    this.selectedLocation = null;
    if (!location) {
      this.setState({
        measurements: [],
        labels: [],
      });
      return;
    }

    this.selectedLocation = location;
    this.loadMeasurements();
  };

  handleSelectParameter = (event: ChangeEvent<HTMLSelectElement>) => {
    const parameter = event.target.value;
    this.selectedParameter = parameter;
    this.loadMeasurements();
  };

  loadMeasurements = async () => {
    const selectedLocation = this.selectedLocation;
    if (!selectedLocation) {
      return;
    }
    const last = dayjs(selectedLocation.lastUpdated);

    let start = last.clone();
    let end = start.subtract(1, 'week');

    const measurements = await OpenaqService.getMeasurements({
      location: selectedLocation.location,
      date_from: end.format('YYYY-MM-DD'),
      date_to: start.format('YYYY-MM-DD'),
      limit: 1000,
      parameter: this.selectedParameter,
    });

    const values = measurements.data.results.map((measure: Measurement) => {
      return measure.value;
    });

    const labels = measurements.data.results.map((measure: Measurement) => {
      return dayjs(measure.date.local).format('DD/MM/YYYY');
    });

    this.setState({
      measurements: values,
      labels: labels,
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='section'>
          <div className='columns'>
            <div className='column'>
              <LocationSelector
                onLocationSelected={this.handleLocationSelected}
              ></LocationSelector>
            </div>

            <div className='column'>
              <label>Parameter</label>
              <div className='field'>
                <div className='select'>
                  <select onChange={this.handleSelectParameter}>
                    <option value='so2'>so2</option>
                    <option value='no2'>no2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <Chart
            data={this.state.measurements}
            labels={this.state.labels}
          ></Chart>
        </div>
      </div>
    );
  }
}

export default App;
