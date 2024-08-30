'use client';
import { CurrentPageType, IWithClass } from '@/types';
import classNames from 'classnames';
import {FC, MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';
import store from '@/store/store';

import kidsIn from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_IN.json"
import kidsFull from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_FULL.json"
import kidsOut from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_OUT.json"
import kidsHover from "@/../public/Assets/Animations/landing-switch-button/kids/D_kids_MOUSE_IN.json"

import adultIn from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_IN.json"
import adultFull from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_FULL.json"
import adultOut from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_OUT.json"
import adultHover from "@/../public/Assets/Animations/landing-switch-button/adult/D_anime_MOUSE_IN.json"
import {useHash} from "@/components/_hooks/useHash";
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
  render: () => ReactNode 
  handleClick: () => void
  firstType: "adult" | "kids",
  startIShow: boolean
}

const LandingSwitchButton: FC<Props> = ({render,  className, handleClick, firstType, startIShow}) => {
  const ref=useRef<LottieRefCurrentProps | null>(null)
  const [isShow, setIsShow] = useState(startIShow)
  const [type, setType] = useState(firstType)
  const [animation, setAnimation] = useState<"in" | "full" | "out"| "hover">("out")
  const [isWasHover, setIsWasHover] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isWasScroll, setIsWasScroll] = useState(false)
  const hash=useHash()

  const handleEnd = () => {
    if (!isShow && startIShow){
      setType(prevState => prevState=="kids"? "adult":"kids")
      setIsShow(true)
    }
  }

  useEffect(() => {
    setIsShow(startIShow)
  }, [startIShow]);

  useEffect(() => {
    if (isShow) {
      const handleScroll = () => {
        setIsWasScroll(true)

        window.removeEventListener("scroll", handleScroll)
      }

      window.addEventListener("scroll", handleScroll)
    }
    else {
      setIsWasScroll(false)
      setIsWasHover(false)
    }
  }, [isShow]);

  useEffect(() => {
    ref.current?.play()

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
    setIsShow(false)
  }, [hash]);

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
          style={{pointerEvents: isWasScroll? "auto":"none"}}
      >
        <Lottie
            animationData={animations[type][animation]}
            loop={false}
            lottieRef={ref}
            onComplete={handleEnd}
            className="landing-switch-button__content"
        />
      </button>
  );
};

export default LandingSwitchButton;