import "./draggable.scss";
import * as React from "react";
import Animation from "@Components/animate/Animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons";
import { getDragData } from "./Draggable";

export interface DragSlotProps {
  message?: string;
  className?: string;
  name?: string;
  group: string;
}

export interface DragSlotState {}

class DragSlot extends React.Component<DragSlotProps, DragSlotState> {
  handleDrop = (e: any) => {
    e.preventDefault();
    const { group } = this.props;
    const attrGroup = e.target.getAttribute("group");
    if (attrGroup == group) {
      // Same group
      console.log(getDragData());
    }
  };

  render() {
    const { group, className } = this.props;

    return (
      <div
        className={`dragSlot ${className}`}
        ref={(e: any) => e.setAttribute("group", group)}
        onMouseUpCapture={this.handleDrop}
        onMouseMove={() => console.log("MMMM")}
        onDragOver={() => console.log("LLLLL")}
      >
        <div
          style={{
            pointerEvents: "none"
          }}
        >
          <Animation
            animations={{
              height: "70%",
              width: "70%",
              template: "poke"
            }}
            className={`dragSlotAnim`}
          >
            <FontAwesomeIcon
              style={{ width: "100%", height: "100%" }}
              icon={faHandPointUp}
            />
          </Animation>
        </div>
      </div>
    );
  }
}

export default DragSlot;
