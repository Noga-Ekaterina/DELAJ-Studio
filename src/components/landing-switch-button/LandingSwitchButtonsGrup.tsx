'use client';
import React, {useEffect, useState} from 'react';
import store from "@/store/store";
import './landing-switch-button.scss';
import { Transition } from 'react-transition-group';
import {transitionStyles} from "@/vars";
import LandingSwitchButton from "@/components/landing-switch-button/LandingSwitchButton";
import KidsButton from "@/components/landing-switch-button/KidsButton";
import AdultButton from "@/components/landing-switch-button/AdultButton";
import {useHash} from "@/components/_hooks/useHash";
import {observer} from "mobx-react-lite";

const LandingSwitchButtonsGrup = () => {
  const { isLandingSwiped, showMainScreen, swipeLanding, changeCurrentPage } = store;
  const hash =useHash()
  const [curtainAnimationEnd, setCurtainAnimationEnd] = useState(false)
  const [standartShowButton, setStandartShowButton] = useState(false)
  const scale= hash=="second-landing"?-1:1

  useEffect(() => {
    if (!showMainScreen){
      setTimeout(()=> setCurtainAnimationEnd(true), 700)
    }
  }, [showMainScreen]);

  useEffect(() => {
    setStandartShowButton((hash=="first-landing" || hash=="second-landing")&&curtainAnimationEnd)
  }, [hash, curtainAnimationEnd]);

  const changeSwiped = (swiped: boolean) => {
    swipeLanding(swiped)
    changeCurrentPage(swiped? "adult":"kids")
  }

  return (
      <>
        <div
            className="landing-switch-button-grup button-right"
            style={{transform: `scaleX(${scale}`}}
        >
          <LandingSwitchButton
              handleClick={() => changeSwiped(true)}
              render={() => <KidsButton/>}
              firstType="adult"
              startIShow={standartShowButton && !isLandingSwiped}
          />
        </div>
        <div
            className="landing-switch-button-grup button-left"
            style={{transform: `scaleX(${scale}`}}
        >
          <LandingSwitchButton
              handleClick={() => changeSwiped(false)}
              render={() => <AdultButton/>}
              firstType="kids"
              startIShow={standartShowButton && isLandingSwiped}
          />
        </div>
      </>

  );
};

export default observer(LandingSwitchButtonsGrup);
