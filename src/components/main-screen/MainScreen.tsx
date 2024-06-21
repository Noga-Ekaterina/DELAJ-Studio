'use client'
import { FC, useRef, useState } from 'react';
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

const MainScreen: FC = () => {
  const {isMenuOpened} = store;
  const {changeMenuOpened} = store;
  const [showArrow, setShowArrow] = useState(false);
  const arrowRef = useRef(null)

  const handleEvent = () => {
    changeMenuOpened(true);
  }

  return (
    <div 
      className='main-screen' 
      onWheel={handleEvent} 
      onTouchMove={handleEvent}
      style={{zIndex: isMenuOpened ? -1 : 1}}
    >
      {isMenuOpened
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
  );
};

export default observer(MainScreen);