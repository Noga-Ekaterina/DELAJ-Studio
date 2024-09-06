'use client'
import { FC, useEffect, useRef, useState } from 'react';
import Lottie from "lottie-react";

//Animation
import logoAnimationOn from '../../../public/Assets/Animations/logo/delai_logo_In.json'
import logoAnimationOut from '../../../public/Assets/Animations/logo/delai_logo_Out.json';

//Images
import arrow from '../../../public/images/arrow.svg';

import './main-screen.scss';
import LanguageToggle from '../language-toggle/LanguageToggle';
import store from '@/store/store';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { halvar } from '@/fonts';
import Image from 'next/image';
import { Transition } from 'react-transition-group';
import { useHash } from '@/components/_hooks/useHash';
import PageMenu from '../page-menu/PageMenu';
import { transitionStyles } from '@/vars';
import Curtain from "@/components/curtain/Сurtain";
import {useLoad} from "@/components/_hooks/useLoad";
import {changeOverflow} from "@/utils/changeOverflow";

const menuStyles = {
  unmounted: { top: "0%",},
  entering: { top: "0%",},
  entered: { top: "0%",},
  exiting:  {  top: "-100vh",},
  exited:  {  top: "-100vh",},
};

const MainScreen: FC = () => {
  const {
    isMenuLandingsOpened,
    changeMenuOpened,
    changeCurrentPage,
    currentPage,
    showMainPage,
    changeShowMainPage,
    showMainScreen,
    changeShowMainScreen,
    isLandingSwiped,
    isScrollOn
  } = store;
  const [showArrow, setShowArrow] = useState(false);
  const [isAnimationPlay, setIsAnimationPlay] = useState(true)
  const hash = useHash();
  const arrowRef = useRef(null)
  const containrRef=useRef(null)
  const isLoad=useLoad()

  const disabled = () => {
    if (containrRef.current!=null){
      (containrRef.current as HTMLDivElement).style.pointerEvents="none"
      setTimeout(()=>{
        if(containrRef.current)
          (containrRef.current as HTMLDivElement).style.pointerEvents=""
        // window.scrollTo(0,0)
      }, 900)
    }
  }
  const handleEvent = () => {
    if (!isLoad)
      changeMenuOpened(true);
  }

  useEffect(() => {
    console.log({isAnimationPlay, isLoad})
    if (!hash || !showMainPage) {
      changeMenuOpened(false);
      changeCurrentPage(null);
      changeShowMainScreen(true);
      disabled()
    } else if (hash === 'main-screen'){
      changeShowMainScreen(true);
      disabled()
    } else if (hash !== 'main-screen' && hash!=""){
      changeShowMainScreen(false);
      console.log("hidden main screen")

      if (hash!="first-landing")
        changeCurrentPage(null)
      else{
        if (isScrollOn)
          changeCurrentPage(isLandingSwiped? "adult":"kids")
      }
    }

  },[hash, showMainPage, isScrollOn])

  useEffect(() => {
    changeOverflow(hash=="" || hash=="main-screen" || !showMainPage)
  }, [hash, showMainPage]);

  useEffect(() => {
    if (!isLoad && !isAnimationPlay)
      changeShowMainPage(true)
  }, [isLoad, isAnimationPlay]);

  useEffect(() => {
    if (!isLoad &&!isAnimationPlay && !isMenuLandingsOpened)
      setShowArrow(true)
  }, [isLoad, isAnimationPlay, isMenuLandingsOpened]);

  return (
      <Curtain show={showMainScreen} zIndex={(currentPage || (hash!="" && hash!="main-screen"))? 4:3} className="main-screen">
        <div
            className="main-screen__content"
            onWheel={handleEvent}
            onTouchMove={handleEvent}
            ref={containrRef}
        >
          {(isMenuLandingsOpened && !currentPage)
              ? <Lottie
                  className='main-screen__logo'
                  animationData={logoAnimationOut}
                  loop={false}
                  onEnterFrame={() => setShowArrow(false)}
              />
              : <Lottie
                  className='main-screen__logo'
                  animationData={logoAnimationOn}
                  loop={false}
                  onComplete={() => setIsAnimationPlay(false)}
              />
          }

          <Transition nodeRef={arrowRef} in={showArrow} timeout={0}>
            {state => (
                <Image
                    className='main-screen__arrow'
                    src={arrow}
                    alt=""
                    ref={arrowRef}
                    style={{
                      unmounted: {opacity: 0},
                      entering: {opacity: 1},
                      entered: {opacity: 1},
                      exiting: {opacity: 0},
                      exited: {opacity: 0},
                    }[state]}
                />
            )}

          </Transition>
          <LanguageToggle className={cn('main-screen__language', halvar.className)}/>
        </div>
        <PageMenu/>
      </Curtain>
  );
};

export default observer(MainScreen);