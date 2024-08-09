'use client'
import React, {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import "./close-modal-button.scss"
import cn from "classnames";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import closeHover from "@/app/assets/lottie/header/menu/X_Mouse.json";
import closeIn from "@/app/assets/lottie/header/menu/menu_transition_to_X.json";

interface CloseModalButtonProps {
  func: ()=> void,
  className?: string
}

const CloseModalButton = ({func, className}:CloseModalButtonProps) => {
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

export default CloseModalButton;
