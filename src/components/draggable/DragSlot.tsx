import "./draggable.scss";
import * as React from "react";

export interface DragSlotProps {
  message?: string;
  className?: string;
}

export interface DragSlotState {}

class DragSlot extends React.Component<DragSlotProps, DragSlotState> {
  render() {
    const { className } = this.props;

    return (
      <div className={`dragSlot ${className}`}>
        <div>
          <div>Alo</div>
        </div>
      </div>
    );
  }
}

export default DragSlot;
