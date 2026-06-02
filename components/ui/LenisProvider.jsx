"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function LenisProvider({ children }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.06,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        smoothTouch: true,
        touchLerp: 0.08,
        infinite: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      }}
      rootOptions={{
        frame: 1,
        sync: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
