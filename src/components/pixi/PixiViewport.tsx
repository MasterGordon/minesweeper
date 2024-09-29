import React from "react";
import * as PIXI from "pixi.js";
import { IClampZoomOptions, Viewport as PixiViewport } from "pixi-viewport";
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
  clampZoom?: IClampZoomOptions;
  onViewportChange?: (viewport: PixiViewport) => void;
  viewportRef?: React.RefObject<PixiViewport>;
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
    if (props.clampZoom) {
      viewport.clampZoom(props.clampZoom);
    }
    viewport.on("moved", () => {
      props.onViewportChange?.(viewport);
    });
    viewport.on("zoomed-end", () => {
      props.onViewportChange?.(viewport);
    });

    if (props.viewportRef) {
      // @ts-expect-error We dont care since this is internal api
      props.viewportRef.current = viewport;
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
      oldProps.height !== newProps.height ||
      oldProps.worldWidth !== newProps.worldWidth ||
      oldProps.worldHeight !== newProps.worldHeight
    ) {
      viewport.resize(
        newProps.width,
        newProps.height,
        newProps.worldWidth,
        newProps.worldHeight,
      );
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
