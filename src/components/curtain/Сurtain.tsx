'use client'
import {FC, useRef} from "react";
import "./curtain.scss"
import { observer } from 'mobx-react-lite';
import {Transition} from "react-transition-group";
import cn from 'classnames';
import {IWithChildren} from "@/types";

const transitionDuration = 700;
const curtainTransition = {transition: 'top 0.7s cubic-bezier(0.16, 1, 0.3, 1)'};

const curtainStyles = {
  unmounted: { top: "0%",},
  entering: { top: "0%",},
  entered: { top: "0%",},
  exiting:  {  top: "calc(-100* var(--vh))",},
  exited:  {  top: "calc(-100* var(--vh))",},
};

interface CurtainProps extends IWithChildren{
  show: boolean,
  zIndex?: number,
  className?: string
}

const Curtain: FC<CurtainProps> = ({children, show, zIndex, className}) => {
  const ref = useRef<HTMLDivElement>(null);
  const baseZIndex = zIndex ?? 5;

  return (
      <Transition nodeRef={ref} in={show} timeout={transitionDuration}>
        {state => {
          const currentZIndex = state === "exited" ? -1 : state === "entering" ? baseZIndex : baseZIndex;

          return (
              <div
                  ref={ref}
                  className={cn("curtain", className)}
                  style={{
                    ...curtainTransition,
                    ...curtainStyles[state],
                    zIndex: currentZIndex
                  }}
              >
                {children}
              </div>
          )
        }}
      </Transition>
  );
};

export default observer(Curtain)
