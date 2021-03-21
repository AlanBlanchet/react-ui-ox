import "./input.scss";
import * as React from "react";
import SimpleButton from "../button/SimpleButton";

export interface SelectionInputProps {
  placeholder?: string;
  className?: string;
  noDataLabel?: string;
  data: string[];
}

export interface SelectionInputState {}

class SelectionInput extends React.Component<
  SelectionInputProps,
  SelectionInputState
> {
  state = {
    value: "",
    visible: false
  };

  handleSubmit = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    this.setState({ value, visible: value });
  };

  handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const { innerText } = e.currentTarget;
    this.setState({ value: innerText, visible: false });
  };

  render() {
    const { value, visible } = this.state;
    const { className, children, placeholder, noDataLabel, data } = this.props;
    const filteredData = data
      .filter((selection) =>
        selection.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
      .map((selection, index) => {
        return (
          <SimpleButton
            className={`inputSelectionCell`}
            key={`selection${index}`}
            onClick={this.handleClick}
          >
            {selection}
          </SimpleButton>
        );
      });

    return (
      <div className={`inputSelection ${className}`}>
        <div>
          <textarea
            placeholder={`${placeholder ?? "Search..."}`}
            rows={1}
            onInput={this.handleSubmit}
            style={{ opacity: value ? 1 : 0.5 }}
            onClick={() => this.setState({ visible: true })}
            value={value}
          ></textarea>
          <SimpleButton
            className={`inputSelectionDelete`}
            onClick={() => this.setState({ value: "", visible: false })}
          >
            X
          </SimpleButton>
        </div>
        <div style={{ display: `${visible ? "block" : "none"}` }}>
          <hr />
          <div>
            <div
              style={{
                maxHeight: "200px"
              }}
            >
              {filteredData.length ? (
                filteredData
              ) : (
                <div>{noDataLabel || "No data"}</div>
              )}
            </div>
            <div>
              {children && (
                <React.Fragment>
                  {
                    <React.Fragment>
                      <hr />
                      {children}
                    </React.Fragment>
                  }
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectionInput;
