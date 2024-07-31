'use client';
import React, {useEffect} from 'react';
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
  const { isLandingSwiped, swipeLanding, changeCurrentPage } = store;
  const hash =useHash()

  useEffect(() => {
    changeCurrentPage(isLandingSwiped? "adult":"kids")
  }, [isLandingSwiped]);

  return (
      <div
          className="landing-switch-button-grup"
          style={{
            ...transitionStyles,
            left: isLandingSwiped? "-90rem": "calc(100vw - 90rem)",
            bottom: hash == "first-landing" ? "-100vh" : hash == "second-landing" ? 0 : "100vh",
            display: (hash != "first-landing" && hash != "second-landing") ? "none" : ""
          }}
      >
        <div className="button-right">
          <LandingSwitchButton
              handleClick={() => swipeLanding(true)}
              render={() => <KidsButton/>}
          />
          <LandingSwitchButton
              handleClick={() => swipeLanding(true)}
              render={() => <AdultButton/>}
          />
        </div>
        <div className="button-left">
          <LandingSwitchButton
              handleClick={() => swipeLanding(false)}
              render={() => <AdultButton/>}
          />
          <LandingSwitchButton
              handleClick={() => swipeLanding(false)}
              render={() => <KidsButton/>}
          />
        </div>
      </div>

  );
};

export default observer(LandingSwitchButtonsGrup);
