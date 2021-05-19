import "./input.scss";
import * as React from "react";

export interface CheckboxProps {
  onChecked?: Function;
  onClick?: Function;
  onUnchecked?: Function;
  checked?: boolean | false;
}

export interface CheckboxState {
  checked?: boolean | false;
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  state = {
    checked: false
  };

  handleOnClick = (e: any) => {
    const { checked } = this.state;
    const { onChecked, onUnchecked, onClick } = this.props;
    this.setState({ checked: !checked });
    onClick?.(e);
    !checked && onChecked?.(e);
    checked && onUnchecked?.(e);
  };

  render() {
    const { checked: checkedState } = this.state;
    const { checked: checkedProps } = this.props;
    const checked = checkedProps ?? checkedState;

    return (
      <div className={`inputCheckbox`}>
        <span className={`${checked && "active"}`}></span>
        <button onClick={this.handleOnClick}></button>
      </div>
    );
  }
}

export default Checkbox;
