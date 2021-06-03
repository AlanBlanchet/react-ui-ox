import "./draggable.scss";
import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Animation from "@Components/animate/Animation";

export interface DraggableProps {
  dragElement?: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<any>
  >;
}

export interface DraggableState {
  dragElement?: HTMLElement | null;
}

class Draggable extends React.Component<DraggableProps, DraggableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dragElement: undefined
    };
  }

  handleDragStart = (e: any) => {
    e.stopPropagation();
    const { dragElement } = this.props;
    let element;
    dragElement ?? <p>Drag</p>;
    if (dragElement) element = React.cloneElement(dragElement);
    else element = <div>Alo</div>;
    element = (
      <Animation
        id={`draggableElement`}
        className={`draggableImage`}
        style={{ visibility: "hidden" }}
        animations="circle"
      >
        {element}
      </Animation>
    );
    const external = document.getElementById("external");
    render(element, external);
    this.setState({ dragElement: document.getElementById("draggableElement") });
    // Transparent elem
    const elem = document.createElement("span");
    e.dataTransfer.setDragImage(elem, 0, 0);
    elem.remove();
  };

  handleDrag = (e: any) => {
    const { dragElement } = this.state;
    if (dragElement) {
      dragElement.style.left = `${e.clientX}px`;
      dragElement.style.top = `${e.clientY}px`;
      dragElement.style.visibility = `visible`;
    }
  };

  handleDragEnd = (e: any) => {
    e.target.style.opacity = 1;
    const htmlElem = document.getElementById("external");
    htmlElem && unmountComponentAtNode(htmlElem);
  };

  render() {
    const { children } = this.props;
    return (
      <div
        className={`draggable`}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onDrag={this.handleDrag}
        draggable
      >
        {children}
      </div>
    );
  }
}

export default Draggable;
