'use client';
import React, {memo, useEffect, useState} from 'react';
import store from "@/store/store";
import './landing-switch-button.scss';
import LandingSwitchButton from "@/components/landing-switch-button/LandingSwitchButton";
import {useHash} from "@/components/_hooks/useHash";
import {observer} from "mobx-react-lite";

const LandingSwitchButtonsGrup = () => {
  const {isShowContent, isLandingSwiped, showMainScreen, swipeLanding, changeCurrentPage } = store;
  const hash =useHash()
  const [curtainAnimationEnd, setCurtainAnimationEnd] = useState(false)

  useEffect(() => {
    if (!showMainScreen){
      setTimeout(()=> setCurtainAnimationEnd(true), 700)
    }
  }, [showMainScreen]);

  const changeSwiped = (swiped: boolean) => {
    swipeLanding(swiped)
    changeCurrentPage(swiped? "adult":"kids")
  }

  return (
    <>
      {
        isShowContent &&
          <>
             <div
                 className="landing-switch-button-grup button-right"
             >
                <LandingSwitchButton
                    handleClick={() => changeSwiped(hash=="first-landing")}
                    type="adult"
                    isShow={curtainAnimationEnd &&((hash=="first-landing" && !isLandingSwiped) || (isLandingSwiped && hash=="second-landing"))}
                />
             </div>
             <div
                 className="landing-switch-button-grup button-left"
             >
                <LandingSwitchButton
                    handleClick={() => changeSwiped(hash!="first-landing")}
                    type="kids"
                    isShow={curtainAnimationEnd&& ((hash=="second-landing" && !isLandingSwiped) ||(isLandingSwiped && hash=="first-landing"))}
                />
             </div>
          </>
      }
    </>
  );
};

export default memo(observer(LandingSwitchButtonsGrup));
