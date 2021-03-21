import * as React from "react";
import SimpleButton from "../button/SimpleButton";
import SelectionInput, { SelectionInputProps } from "./SelectionInput";

export interface SelectionInputAddProps extends SelectionInputProps {
  addName?: string;
  onAdd?: Function;
}

export interface SelectionInputAddState {}

class SelectionInputAdd extends React.Component<
  SelectionInputAddProps,
  SelectionInputAddState
> {
  handleClick = () => {
    const { onAdd } = this.props;
    onAdd?.();
  };

  render() {
    const { addName, data, noDataLabel } = this.props;

    return (
      <SelectionInput
        className={`inputSelectionAdd`}
        data={data}
        noDataLabel={noDataLabel}
      >
        <div className={`inputSelectionAddSection`}>
          <div>{addName ?? ""}</div>
          <SimpleButton onClick={this.handleClick}>+</SimpleButton>
        </div>
      </SelectionInput>
    );
  }
}

export default SelectionInputAdd;
