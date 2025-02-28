'use client';
import {IWithClass } from '@/types';
import {FC, useEffect, useRef, useState} from 'react';
import kidsIn from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_IN.json"
import kidsFull from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_FULL.json"
import kidsOut from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_OUT.json"
import kidsHover from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_MOUSE_IN.json"

import adultIn from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_IN.json"
import adultFull from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_FULL.json"
import adultOut from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_OUT.json"
import adultHover from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_MOUSE_IN.json"
import Lottie, {LottieRefCurrentProps} from "lottie-react";

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
  const ref=useRef<LottieRefCurrentProps | null>(null)
  const [isHidden, setIsHidden] = useState(false)
  const [outEnd, setOutEnd] = useState(false)
  const [animation, setAnimation] = useState<"in" | "full" | "out"| "hover">("out")
  const [isWasHover, setIsWasHover] = useState(false);
  const [isHover, setIsHover] = useState(false);
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
      setIsWasHover(false)
    }

    return ()=>{
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isShow]);

  useEffect(() => {

    if (isShow){
      if (isWasScroll){
        if (isWasHover){
          setAnimation("hover")
          if (!isHover)
            ref.current?.setDirection(-1)
         else
            ref.current?.setDirection(1)
        }else
          setAnimation("full")
      }else
        setAnimation("in")
    } else {
      ref.current?.setDirection(1)
      setAnimation("out")
    }
  }, [isShow, isWasScroll, isHover, ref.current])

  useEffect(() => {
    if (isShow)
      ref.current?.play()
  }, [animation, isHover]);

  // useEffect(() => {
  //   setIsShow(false)
  // }, [hash]);

  return (
      <button
          onMouseOver={() => {
            setIsHover(true);
            setIsWasHover(true);
          }}
          onMouseOut={() => setIsHover(false)}
          onClick={handleClick}
          className={'landing-switch-button'}
          type='button'
          style={{pointerEvents: isWasScroll? "auto":"none", display: outEnd? "none":"block"}}
      >
        <Lottie
            animationData={animations[type][animation]}
            loop={false}
            autoPlay={false}
            lottieRef={ref}
            onComplete={handleEnd}
            className="landing-switch-button__content"
        />
      </button>
  );
};

export default LandingSwitchButton;