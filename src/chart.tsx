import React from 'react';
import { Line } from 'react-chartjs-2';
export default class Chart extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <Line
        data={{
          labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 50, 10, 3, 7],
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
