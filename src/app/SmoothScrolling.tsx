"use client";
import {ReactLenis} from "@studio-freight/react-lenis";
import {IWithChildren} from "@/types";
function SmoothScrolling({ children }: IWithChildren) {

  return (
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }} >
        {children}
      </ReactLenis>
  );
}

export default SmoothScrolling;