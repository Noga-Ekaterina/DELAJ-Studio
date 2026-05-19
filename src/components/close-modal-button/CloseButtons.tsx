'use client'
import React from 'react';
import "./close-modal-button.scss"
import cn from "classnames";
import closeHover from "../../../public/Assets/Animations/header/menu/X_Mouse.json";
import closeIn from "../../../public/Assets/Animations/header/menu/menu_transition_to_X.json";
import {IWithChildren} from "@/types";
import LottieIconButton from "@/components/lottie-icon-button/LottieIconButton";

interface CloseModalButtonProps extends IWithChildren{
  func: ()=> void,
  className?: string
}

const CloseButtons = ({func, className, children}:CloseModalButtonProps) => {
  return (
      <div className="close-modal-button__wrapp">
        {children}
        <LottieIconButton
            onClick={func}
            animationData={closeIn}
            hoverAnimationData={closeHover}
            iconClassName={cn('close-modal-button', className)}
        />
      </div>
);
};

export default CloseButtons;
