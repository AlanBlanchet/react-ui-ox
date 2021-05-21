import * as React from "react";
import SimpleButton from "./SimpleButton";

export interface AlternateButtonProps {
  children?: React.ReactNode[];
  index?: number;
}

export interface AlternateButtonState {
  index: number;
  length: number;
}

class AlternateButton extends React.Component<
  AlternateButtonProps,
  AlternateButtonState
> {
  constructor(props: AlternateButtonProps) {
    super(props);
    this.state = {
      index: 0,
      length: props.children?.length ?? 0
    };
  }

  handleClick = () => {
    const { index, length } = this.state;
    length != 0 && this.setState({ index: (index + 1) % length });
  };

  render() {
    const { index: indexState } = this.state;
    const { index: indexProps, children } = this.props;
    const index = indexProps ?? indexState;
    const alternate = children?.[
      index % (children.length || 1)
    ] as React.ReactElement<any>;

    return (
      <SimpleButton className={`buttonAlternate`} onClick={this.handleClick}>
        {alternate}
      </SimpleButton>
    );
  }
}

export default AlternateButton;
