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
import { transitionStyles } from '@/vars';
import { useMediaQuery } from 'react-responsive';
 
interface Props {
  isOpened: boolean
}

const KidsScreen: FC<Props> = (props) => {
  const blackGirlRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const isMediumScreen = useMediaQuery({maxWidth: 1024, minWidth: 640});
  const opened = isMediumScreen || props.isOpened;
  const className = cn('kids-screen', opened ? 'opened' : '');

  return (
    <div className={className}>
      {/* Девочка на черном фоне */}
      <div className="kids-screen__picture" id="kids-screen-black">
        <Transition nodeRef={blackGirlRef} in={opened} timeout={0}>
          {state => (
            <div 
              className="picture-content"
              style={{
                ...transitionStyles,
                ...{
                  unmounted: {height: '100%'}, 
                  entering: {height: '200%'},
                  entered: {height: '200%'},
                  exiting:  { height: '100%'},
                  exited:  { height: '100%'},
                }[state]
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
                ...{
                  unmounted: {width: '50vw', left: '0%'}, 
                  entering: {width: '60vw', left: '25%', },
                  entered: {width: '60vw', left: '25%', },
                  exiting:  {width: '50vw', left: '0%', },
                  exited:  { width: '50vw', left: '0%', },
                }[state]
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