import React, { useLayoutEffect } from "react";
import { type IClampZoomOptions, Viewport } from "pixi-viewport";
import { extend, useApplication } from "@pixi/react";

extend({ Viewport });

import { type PixiReactElementProps } from "@pixi/react";

declare module "@pixi/react" {
  interface PixiElements {
    pixiViewport: PixiReactElementProps<typeof Viewport>;
  }
}

interface ViewportProps {
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
  onViewportChange?: (viewport: Viewport) => void;
  viewportRef?: React.RefObject<Viewport | null>;
}

const PixiViewport = (props: ViewportProps) => {
  const { app } = useApplication();
  const ref = React.useRef<Viewport | null>(null);
  const { clamp, clampZoom, onViewportChange, viewportRef } = props;
  useLayoutEffect(() => {
    void app.renderer;
    const viewport = ref.current;
    if (!viewport) return () => {};
    viewport
      .drag({
        ignoreKeyToPressOnTouch: true,
        mouseButtons: "middle",
      })
      .pinch()
      .wheel();
    if (clamp) {
      viewport.clamp(clamp);
    }
    if (clampZoom) {
      viewport.clampZoom(clampZoom);
    }
    viewport.on("moved", () => {
      onViewportChange?.(viewport);
    });
    viewport.on("zoomed-end", () => {
      onViewportChange?.(viewport);
    });

    if (viewportRef) {
      viewportRef.current = viewport;
    }
    return () => {
      viewport.off("moved");
      viewport.off("zoomed-end");
    };
  }, [clamp, clampZoom, onViewportChange, viewportRef, app.renderer]);
  if (!app.renderer) return null;
  return (
    <pixiViewport
      ref={ref}
      screenWidth={props.width}
      screenHeight={props.height}
      worldWidth={props.worldWidth}
      worldHeight={props.worldHeight}
      ticker={app.ticker}
      events={app.renderer.events}
      disableOnContextMenu
      allowPreserveDragOutside
    >
      {props.children}
    </pixiViewport>
  );
};

export default PixiViewport;
