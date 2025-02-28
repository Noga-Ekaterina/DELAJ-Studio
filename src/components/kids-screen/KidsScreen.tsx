'use client';
import { FC, useEffect, useRef, useState } from 'react';
import './kids-screen.scss';
import cn from 'classnames';
import TextLogo from '../text-logo/TextLogo';

import { Transition } from 'react-transition-group';
import { transitionStyles } from '@/vars';
import { useMediaQuery } from 'react-responsive';
import { observer } from 'mobx-react-lite';
import store from '@/store/store';
import { P } from 'ts-pattern';
 
interface Props {
  isOpened: boolean
}

const KidsScreen: FC<Props> = (props) => {
  const blackGirlRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const isMediumScreen = useMediaQuery({maxWidth: 1024});
  const [opened, setOpened] = useState(props.isOpened);
  const className = cn('kids-screen', opened ? 'opened' : '');

  useEffect(() => {
    if (props.isOpened) {
      setOpened(true);
    } else {
      setOpened(false);
    }
  },[isMediumScreen, props.isOpened])

  return (
    <div className={className}>
      {/* Девочка на черном фоне */}
      <div className="kids-screen__picture" id="kids-screen-black">
        <Transition nodeRef={blackGirlRef} in={opened} timeout={0}>
          {state => (
            <div 
              className="picture-content"
              style={{
                ...transitionStyles
              }}
            >
              <img src="/Assets/Slides/Animations/Images/Curtain/Valya.png" alt=''/>
            </div>
          )}
        </Transition>
      </div>

      {/* Картинка с домом */}
      <div className="kids-screen__picture" id="kids-screen-picture">
        <img src="/Assets/Slides/Animations/Images/Curtain/Book.png" alt="" />
      </div>

      {/* Облачко белом фоне */}
      <div className="kids-screen__picture" id="kids-screen-white">
        <img src="/Assets/Slides/Animations/Images/Curtain/Cloud.png" alt="" />
      </div>

      {/* Лого */}
      <div className="kids-screen__picture " id="kids-screen-logo">
        <Transition in={opened} nodeRef={logoRef} timeout={0}>
          {state => (
            <div 
              ref={logoRef}
              className="kids-screen__picture-logo"
              style={{
                ...transitionStyles,
              }}
            >
              <div className="kids-screen__picture-logo-wrap">
                <img src="/Assets/Slides/Animations/Images/Curtain/Kids-logo.svg" alt='' />
                <TextLogo className='kids-screen__text-logo logo-subtitle' />
              </div>
            </div>
          )}
        </Transition>
      </div>

      {/* Лягушка */}
      <div className="kids-screen__picture" id="kids-screen-green">
        <img src="/Assets/Slides/Animations/Images/Curtain/Frog.png" alt=""/>
      </div>

      {/* Волчонок */}
      <div className="kids-screen__picture" id="kids-screen-blue">
        <img src="/Assets/Slides/Animations/Images/Curtain/Lenya.png" alt=''/>
      </div>

      {/* Машина на красном фоне */}
      <div className="kids-screen__picture"
      id="kids-screen-red">
        <img src="/Assets/Slides/Animations/Images/Curtain/Logo-china.png" className='red-picture-logo' alt=""/>
        <img src="/Assets/Slides/Animations/Images/Curtain/Car.png" className='red-picture-car' alt=""/>
      </div>

      {/* Девочка на фиолетовом фоне */}
      <div className="kids-screen__picture" id="kids-screen-purple">
        <img src="/Assets/Slides/Animations/Images/Curtain/Sonya.png" alt=''/>
      </div>
    </div>
  );
} 

export default KidsScreen;