'use client';
import { FC, useEffect, useRef, useState } from 'react';
import './kids-screen.scss';
import Image from 'next/image';
import cn from 'classnames';

// Images
import screenPicture from '../../../public/Assets/Slides/Animations/Images/Curtain/Book.png';
import blackGirlPicture from '../../../public/Assets/Slides/Animations/Images/Curtain/Valya.png';
import frogPicture from '../../../public/Assets/Slides/Animations/Images/Curtain/Frog.png';
import cloudPicture from '../../../public/Assets/Slides/Animations/Images/Curtain/Cloud.png';
import lenyaPicture from '../../../public/Assets/Slides/Animations/Images/Curtain/Lenya.png';
import purpleGirlPicture from '../../../public/Assets/Slides/Animations/Images/Curtain/Sonya.png';
import logo from '../../../public/Assets/Slides/Animations/Images/Curtain/Kids-logo.svg';
import japLogo from '../../../public/Assets/Slides/Animations/Images/Curtain/Logo-china.png';
import car from '../../../public/Assets/Slides/Animations/Images/Curtain/Car.png';
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
              <Image src={blackGirlPicture} alt=''/>
            </div>
          )}
        </Transition>
      </div>

      {/* Картинка с домом */}
      <div className="kids-screen__picture" id="kids-screen-picture">
        <Image src={screenPicture} alt="" />
      </div>

      {/* Облачко белом фоне */}
      <div className="kids-screen__picture" id="kids-screen-white">
        <Image src={cloudPicture} alt="" />
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
                <Image src={logo} alt='' />
                <TextLogo className='kids-screen__text-logo logo-subtitle' />
              </div>
            </div>
          )}
        </Transition>
      </div>

      {/* Лягушка */}
      <div className="kids-screen__picture" id="kids-screen-green">
        <Image src={frogPicture} alt=""/>
      </div>

      {/* Волчонок */}
      <div className="kids-screen__picture" id="kids-screen-blue">
        <Image src={lenyaPicture} alt=''/>
      </div>

      {/* Машина на красном фоне */}
      <div className="kids-screen__picture" id="kids-screen-red">
        <Image src={japLogo} className='red-picture-logo' alt=""/>
        <Image src={car} className='red-picture-car' alt=""/>
      </div>

      {/* Девочка на фиолетовом фоне */}
      <div className="kids-screen__picture" id="kids-screen-purple">
        <Image src={purpleGirlPicture} quality={100} alt=''/>
      </div>
    </div>
  );
} 

export default KidsScreen;