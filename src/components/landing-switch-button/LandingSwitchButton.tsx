'use client';
import {IWithClass } from '@/types';
import {FC, memo, useEffect, useState} from 'react';
import kidsIn from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_IN.json"
import kidsFull from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_FULL.json"
import kidsOut from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_OUT.json"
import kidsHover from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_MOUSE_IN.json"

import adultIn from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_IN.json"
import adultFull from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_FULL.json"
import adultOut from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_OUT.json"
import adultHover from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_MOUSE_IN.json"
import LottieIconButton from "@/components/lottie-icon-button/LottieIconButton";

const animations={
  kids:{
    in: kidsIn,
    full: kidsFull,
    out: kidsOut,
    hover: kidsHover
  },
  adult:{
    in: adultIn,
    full: adultFull,
    out: adultOut,
    hover: adultHover
  }
}

interface Props extends IWithClass {
  handleClick: () => void
  type: "adult" | "kids",
  isShow: boolean
}

const LandingSwitchButton: FC<Props> = ({className, handleClick, type, isShow}) => {
  const [isHidden, setIsHidden] = useState(false)
  const [outEnd, setOutEnd] = useState(false)
  const [animation, setAnimation] = useState<"in" | "full" | "out">("out")
  const [isWasScroll, setIsWasScroll] = useState(false)

  const handleEnd = () => {
    if (animation=="out")
      setOutEnd(true)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsWasScroll(true)

      window.removeEventListener("scroll", handleScroll)
    }

    if (isShow) {
      setOutEnd(false)
      window.addEventListener("scroll", handleScroll)
    }
    else {
      setIsWasScroll(false)
    }

    return ()=>{
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isShow]);

  useEffect(() => {

    if (isShow){
      if (isWasScroll)
        setAnimation("full")
      else
        setAnimation("in")
    } else {
      setAnimation("out")
    }
  }, [isShow, isWasScroll])

  // useEffect(() => {
  //   setIsShow(false)
  // }, [hash]);

  return (
      <LottieIconButton
          onClick={handleClick}
          className={'landing-switch-button'}
          style={{pointerEvents: isWasScroll? "auto":"none", display: outEnd? "none":"block"}}
          animationData={animations[type][animation]}
          hoverAnimationData={animations[type].hover}
          hoverEnabled={isShow && isWasScroll}
          resetHoverOnAnimationChange
          onComplete={handleEnd}
          iconClassName="landing-switch-button__content"
      />
  );
};

export default memo(LandingSwitchButton);
