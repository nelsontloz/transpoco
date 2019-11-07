import React from 'react';
import { Line } from 'react-chartjs-2';

type ChartProps = {
  data: number[];
  labels: string[];
};
export default class Chart extends React.Component<ChartProps, any> {
  componentDidMount() {}
  render() {
    return (
      <Line
        data={{
          labels: this.props.labels,
          datasets: [
            {
              label: 'so2 - µg/m³',
              data: this.props.data,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        }}
      />
    );
  }
}
