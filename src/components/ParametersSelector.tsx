import React, { ChangeEvent } from 'react';

type LocationSelectorProps = {
  options: string[];
  onChange?: (param: any) => void;
};

type ParametersSelectorState = {
  parameters: any;
};

class ParametersSelector extends React.Component<LocationSelectorProps, any> {
  state = { parameters: {} as any };

  componentDidMount() {
    const selectedFields: any = {};
    this.props.options.forEach((option: string) => {
      selectedFields[option] = false;
    });
    this.setState(selectedFields);
  }

  handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    console.log(event.target);
  };

  render() {
    return (
      <div>
        {this.props.options.map(option => {
          return (
            <div className='field'>
              <label className='checkbox'>
                <input
                  onChange={this.handleChangeInput}
                  type='checkbox'
                  value={option}
                  checked={this.state.parameters[option]}
                />
                {option}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ParametersSelector;
