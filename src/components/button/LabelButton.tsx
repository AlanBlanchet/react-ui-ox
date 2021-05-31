import * as React from "react";
import SimpleButton from "./SimpleButton";

export interface LabelButtonProps {
  title?: string;
  description?: string;
  onClick?: Function;
}

export interface LabelButtonState {}

class LabelButton extends React.Component<LabelButtonProps, LabelButtonState> {
  render() {
    const { title, description, children, onClick } = this.props;

    return (
      <SimpleButton className={`buttonLabel`} onClick={onClick}>
        <label>{title ?? "Title"}</label>
        <p>{description ?? children ?? "Description"}</p>
      </SimpleButton>
    );
  }
}

export default LabelButton;
