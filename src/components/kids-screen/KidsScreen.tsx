'use client';
import { FC, useRef } from 'react';
import './kids-screen.scss';
import Image from 'next/image';
import cn from 'classnames';

// Images
import screenPicture from '../../../public/images/kids/screen-picture.png';
import blackGirlPicture from '../../../public/images/kids/screen-girl-1.png';
import frogPicture from '../../../public/images/kids/screen-frog.png';
import cloudPicture from '../../../public/images/kids/screen-cloud.svg';
import lenyaPicture from '../../../public/images/kids/screen-lenya.png';
import purpleGirlPicture from '../../../public/images/kids/screen-girl-2.png';
import logo from '../../../public/images/kids/logo.svg';
import japLogo from '../../../public/images/kids/sceen-red-logo.svg';
import car from '../../../public/images/kids/screen-red-car.png';
import TextLogo from '../text-logo/TextLogo';

import { Transition } from 'react-transition-group';
 
interface Props {
  isOpened: boolean
}

const KidsScreen: FC<Props> = (props) => {
  const blackGirlRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const className = cn('kids-screen', props.isOpened ? 'opened' : '');

  return (
    <div className={className}>
      {/* Девочка на черном фоне */}
      <div className="kids-screen__picture" id="kids-screen-black">
        <Transition nodeRef={blackGirlRef} in={props.isOpened} timeout={0}>
          {state => (
            <div 
              className="picture-content"
              style={{
                unmounted: {height: '100%'}, 
                entering: {height: 'calc(100vh * 2 / 3)'},
                entered: {height: 'calc(100vh * 2 / 3)', transition: '0s'},
                exiting:  { height: '100%'},
                exited:  { height: '100%', transition: '0s'},
              }[state]}
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
        <Transition in={props.isOpened} nodeRef={logoRef} timeout={0}>
          {state => (
            <div 
              ref={logoRef}
              className="kids-screen__picture-logo"
              style={{
                unmounted: {width: '50vw', left: '0%', transition: '0.7s 0.2s'}, 
                entering: {width: '60vw', left: '25%', transition: '0.7s 0.2s'},
                entered: {width: '60vw', left: '25%', transition: '0s'},
                exiting:  {width: '50vw', left: '0%', transition: '0.7s 0.2s'},
                exited:  { width: '50vw', left: '0%', transition: '0s'},
              }[state]}
            >
              <Image src={logo} alt='' />
              <TextLogo className='kids-screen__text-logo' />
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
        <Image src={car} className='red-picture-car-small' alt=""/>
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