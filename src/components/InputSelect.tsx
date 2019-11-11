import React, { ChangeEvent } from 'react';

type InputSelectProps = {
  options: string[];
  onChange?: (value: string) => void;
};

type InputSelectState = {
  selected: string;
};

export class InputSelect extends React.Component<
  InputSelectProps,
  InputSelectState
> {
  state = {
    selected: '',
  };

  handleSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    this.setState({
      selected: value,
    });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  renderEmptySelect = () => {
    return (
      <select disabled>
        <option>Select an option</option>
      </select>
    );
  };

  renderSelectWithOptions = () => {
    return (
      <select onChange={this.handleSelected}>
        <option value=''>Select an option</option>
        {this.props.options.map((country: string, index: number) => {
          return (
            <option key={`${country}-${index}`} value={country}>
              {country}
            </option>
          );
        })}
      </select>
    );
  };

  render() {
    return (
      <div className='select'>
        {this.props.options.length === 0
          ? this.renderEmptySelect()
          : this.renderSelectWithOptions()}
      </div>
    );
  }
}
