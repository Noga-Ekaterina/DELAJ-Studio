'use client'
import React, {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import "./close-modal-button.scss"
import cn from "classnames";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import closeHover from "../../../public/Assets/Animations/header/menu/X_Mouse.json";
import closeIn from "../../../public/Assets/Animations/header/menu/menu_transition_to_X.json";
import {IWithChildren} from "@/types";

interface CloseModalButtonProps extends IWithChildren{
  func: ()=> void,
  className?: string
}

const CloseButtons = ({func, className, children}:CloseModalButtonProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isWasHover, setIsWasHover] = useState(false);
  const ref = useRef(null);

  const changeDirectionAnimation = (ref: MutableRefObject<LottieRefCurrentProps | null>) => {
    ref.current?.play()
    if (isWasHover && !isHover) {
      ref.current?.setDirection(-1)
    } else {
      ref.current?.setDirection(1)
    }
  };

  useEffect(() => {
    changeDirectionAnimation(ref);

  }, [isWasHover, isHover]);

  return (
      <div className="close-modal-button__wrapp">
        {children}
        <button
            onMouseOver={() => {
              setIsHover(true);
              setIsWasHover(true);
            }}
            onMouseOut={() => setIsHover(false)}
            onClick={func}
        >
          <Lottie
              className={cn('close-modal-button', className)}
              animationData={isWasHover ? closeHover : closeIn}
              loop={false}
              lottieRef={ref}
          />
        </button>
      </div>
);
};

export default CloseButtons;
