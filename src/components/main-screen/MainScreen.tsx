'use client'
import { FC, useEffect, useRef, useState } from 'react';
import Lottie from "lottie-react";

//Animation
import logoAnimationOn from '../../app/assets/lottie/delai_logo_In.json'
import logoAnimationOut from '../../app/assets/lottie/delai_logo_Out.json';

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
    currentPage
  } = store;
  const [show, setShow] = useState(true);
  const [showArrow, setShowArrow] = useState(false);
  const hash = useHash();
  const arrowRef = useRef(null)
  const [hidden, setHidden] = useState(false)

  const handleEvent = () => {
    changeMenuOpened(true);
  }

  useEffect(() => {
    if (!hash) {
      changeMenuOpened(false);
      changeCurrentPage(null);
      setShow(true);
    } else if (hash === 'main-screen'){
      setShow(true);
      setHidden(false)
    } else if (hash !== 'main-screen' && hash!=""){
      setShow(false);
      setTimeout(()=>{
        setHidden(true)
      },700)
  }
  },[hash])

  return (
    <Transition in={show} timeout={0}>
      {state => (
        <>
          <div 
            className='main-screen' 
            style={{
              ...transitionStyles,
              ...menuStyles[state],
              zIndex: hidden ? -1 :4
            }}
          >
            <div 
              className="main-screen__content" 
              onWheel={handleEvent} 
              onTouchMove={handleEvent}
            >
              {isMenuLandingsOpened
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
                    onComplete={() => setShowArrow(true)}
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
                      unmounted: { opacity: 0 },
                      entering: { opacity: 1 },
                      entered: { opacity: 1 },
                      exiting:  { opacity: 0 },
                      exited:  { opacity: 0 },
                    }[state]}
                  />
                )}

              </Transition>
              <LanguageToggle className={cn('main-screen__language', halvar.className)}/>
            </div>
            <PageMenu />
          </div>
        </>
      )}
    </Transition>
  );
};

export default observer(MainScreen);