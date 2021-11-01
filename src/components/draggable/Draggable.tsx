import "./draggable.scss";
import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Animation, { ANIMATION_OBJ } from "@Components/animate/Animation";
import $ from "jquery";
import "jqueryui";

export interface DraggableProps {
  dragElement?: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<any>
  >;
  dragAnimations?: ANIMATION_OBJ;
  name?: string;
  group: string;
  data: any;
}

export interface DraggableState {
  dragElement?: HTMLElement | null;
  visibleElement?: HTMLElement | null;
}

class Draggable extends React.Component<DraggableProps, DraggableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dragElement: undefined,
      visibleElement: undefined
    };
  }

  handleMouseDown = () => {};

  handleDropElement = () => {
    const external = document.getElementById("external");
    window.removeEventListener("mousemove", this.handleDragElement);
    window.removeEventListener("mouseup", this.handleDropElement);
    if (external) unmountComponentAtNode(external);
    console.log("UP");
  };

  handleDragElement = (e: any) => {
    const { dragElement, visibleElement } = this.state;
    const { group } = this.props;
    if (dragElement && visibleElement) {
      dragElement.style.visibility = "visible";
      const ow = visibleElement.offsetWidth;
      const oh = visibleElement.offsetHeight;
      const px = e.pageX;
      const py = e.pageY;
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      dragElement.style.left = `${px > ww - ow ? ww - ow : px > 0 ? px : 0}px`;
      dragElement.style.top = `${py > wh - oh ? wh - oh : py > 0 ? py : 0}px`;
      if (e.target.getAttribute("group") == group) {
      }
    }
  };

  handleDragStart = (e: any) => {
    //e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.setDragImage(new Image(0, 0), 0, 0);
    const { data } = this.props;
    setDragData(data);
    const { dragElement, dragAnimations } = this.props;
    let element = dragElement ?? this.render();
    element = (
      <Animation
        id={`draggableElement`}
        className={`draggableImage`}
        style={{
          visibility: "hidden",
          pointerEvents: "none"
        }}
        animations={Object.assign(
          {
            transformOrigin: "top left",
            animationTimingFunction: "ease-in-out",
            animationDirection: "alternate-reverse",
            animationDuration: "0.3s",
            position: "fixed",
            keyframes: [
              {
                keyframe: "from",
                transform: "rotateZ(38deg)"
              },
              {
                keyframe: "to",
                transform: "rotateZ(55deg)"
              }
            ]
          },
          dragAnimations ?? {}
        )}
      >
        <div
          style={{ position: "relative" }}
          ref={(r) => this.setState({ visibleElement: r })}
        >
          {element}
        </div>
      </Animation>
    );

    const external = document.getElementById("external");
    render(element, external);
    const elem = document.getElementById("draggableElement");
    this.setState({ dragElement: elem });
  };

  handleLoad = (e: any) => {
    $(e).draggable({
      revert: true,
      revertDuration: 0,
      stack: ".draggable",
      helper: "clone",
      containment: "window",
      cursorAt: {
        top: -11,
        left: 28
      },
      start: function (_, __) {},
      drag: function (ev, ui) {
        $(ui.helper).css({
          left: ev.pageX,
          top: ev.pageY
        });
      },
      stop: function (_, ui) {
        ui.helper.remove();
      }
    });
  };

  render() {
    const { children } = this.props;
    return (
      <div className={`draggable`} onLoad={() => this.handleLoad}>
        {children}
      </div>
    );
  }
}

export default Draggable;

let dragData: any = null;

export const getDragData = () => {
  const d = { ...dragData };
  dragData = null;
  return d;
};

export const setDragData = (data: any) => {
  dragData = data;
};

window.addEventListener("mousedown", mousedown);

function mousedown() {
  console.log("DOWN");
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);
}

function mousemove() {
  console.log("MOVE");
}

function mouseup() {
  console.log("UP");
}
