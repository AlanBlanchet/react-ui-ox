import "./button.scss";
import * as React from "react";

export interface SimpleButtonProps {
  onClick?: Function;
  className?: string;
}

export interface SimpleButtonState {}

class SimpleButton extends React.Component<
  SimpleButtonProps,
  SimpleButtonState
> {
  handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const { onClick } = this.props;
    onClick?.(e);
  };

  render() {
    const { children, className } = this.props;

    return (
      <button className={`button ${className}`} onClick={this.handleClick}>
        {children}
      </button>
    );
  }
}

export default SimpleButton;
