import "./animation.scss";
import * as React from "react";
import styled, { css, keyframes } from "styled-components";

export interface AnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  animations: ANIMATION_TYPE | ANIMATION_OBJ;
}

export interface AnimationState {}

class Animation extends React.Component<AnimationProps, AnimationState> {
  applyTemplate = (anim: ANIMATION_OBJ): ANIMATION_OBJ => {
    if ("template" in anim && anim.template != undefined)
      return { ...this.applyTemplate(anim.template()), ...(anim as {}) };
    return anim;
  };

  render() {
    const { children, className, animations } = this.props;

    let anim = animations;

    if (typeof anim == "string") {
      anim = ANIMATIONS[anim];
    }

    anim = this.applyTemplate(anim);

    let Anim;
    if (anim?.keyframes != undefined) {
      const kframes = anim.keyframes;
      const keyframesStr = kframes
        .map((obj: any) => {
          const vals = Object.entries(obj).filter(
            (v) => v[0] != "keyframe" && v[0] != "template"
          );
          return (
            (typeof obj.keyframe == "number"
              ? `${obj.keyframe}%`
              : obj.keyframe) +
            `{${vals
              .map((kv) => `${kv[0]}:${kv[1]};`)
              .reduce((acc: any, val: any) => acc + val)}}`
          );
        })
        .reduce((acc: any, val: any) => acc + val);

      const kf = keyframes`${keyframesStr}`;
      Anim = styled.div(
        () => ({}),
        css`
          animation: ${kf} 1s ease infinite
            ${typeof anim == "object" ? ", animation-motion 1s infinite" : ""};
        `
      );
    } else {
      Anim = styled.div(() => ({}));
    }

    return (
      <div className={`animation ${className}`}>
        <Anim style={{ ...(anim as {}) }}>{children}</Anim>
      </div>
    );
  }
}

export default Animation;

export interface ANIMATION_OBJ_CSS extends React.CSSProperties {
  keyframe: "from" | "to" | number;
}

export interface ANIMATION_OBJ extends React.CSSProperties {
  template?: Function;
  keyframes?: ANIMATION_OBJ_CSS[];
}

export const ANIMATIONS: {
  [key: string]: ANIMATION_OBJ;
} = {
  grow: {
    keyframes: [
      {
        keyframe: 0,
        transform: "scale(120%)"
      },
      {
        keyframe: 50,
        transform: "scale(100%)"
      },
      {
        keyframe: 100,
        transform: "scale(120%)"
      }
    ]
  },
  poke: {
    transform: "translate(50%, 50%)",
    offsetPath: "path('M0,0 V 10Z')",
    offsetRotate: "0deg",
    animationDuration: "0.5s",
    animationTimingFunction: "ease-in"
  },
  wiggle: {
    transform: "translate(50%, 50%)",
    offsetPath: "path('M0,0 H 5 H -5 H 5 H -5 H 5 H -5 H 5 H -5 H 5 H -5Z')",
    animationTimingFunction: "ease",
    template: () => ANIMATIONS.poke
  },
  circle: {
    transform: "translate(50%, 50%)",
    offsetPath: "path('M0,-10 C -10,-10 -10,10 0,10 C 10,10 10,-10 0,-10')",
    offsetRotate: "0deg",
    animationTimingFunction: "linear",
    animationDuration: "0.5s",
    animationIterationCount: "inifinite"
  },
  swirve: {
    transform: "translate(50%, 50%)",
    position: "relative",
    animationDuration: "5s",
    animationTimingFunction: "linear",
    offsetPath: "path('M0,-3 C -5,-3 -5,3 0,3 C 5,3 5,-3 0,-3')",
    offsetRotate: "0deg"
  }
};

export type ANIMATION_TYPE = "wiggle" | "circle" | "poke" | "grow" | "swirve";
