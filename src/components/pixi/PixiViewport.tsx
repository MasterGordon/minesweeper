import React from "react";
import * as PIXI from "pixi.js";
import { Viewport as PixiViewport } from "pixi-viewport";
import { PixiComponent, useApp } from "@pixi/react";
import { BaseTexture, SCALE_MODES } from "pixi.js";
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

export interface ViewportProps {
  width: number;
  height: number;
  worldWidth: number;
  worldHeight: number;
  children?: React.ReactNode;
  clamp?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

export interface PixiComponentViewportProps extends ViewportProps {
  app: PIXI.Application;
}

const PixiComponentViewport = PixiComponent("Viewport", {
  create: (props: PixiComponentViewportProps) => {
    const viewport = new PixiViewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.worldWidth,
      worldHeight: props.worldHeight,
      ticker: props.app.ticker,
      events: props.app.renderer.events,
      disableOnContextMenu: true,
      allowPreserveDragOutside: true,
    });
    viewport
      .drag({
        ignoreKeyToPressOnTouch: true,
        mouseButtons: "middle",
      })
      .pinch()
      .wheel();
    if (props.clamp) {
      viewport.clamp(props.clamp);
    }

    return viewport;
  },
  applyProps: (
    viewport: PixiViewport,
    oldProps: ViewportProps,
    newProps: ViewportProps,
  ) => {
    if (
      oldProps.width !== newProps.width ||
      oldProps.height !== newProps.height
    ) {
      viewport.resize(newProps.width, newProps.height);
    }
    if (oldProps.clamp !== newProps.clamp) {
      viewport.clamp(newProps.clamp);
    }
  },
});

const Viewport = (props: ViewportProps) => {
  const app = useApp();
  return <PixiComponentViewport app={app} {...props} />;
};

export default Viewport;
