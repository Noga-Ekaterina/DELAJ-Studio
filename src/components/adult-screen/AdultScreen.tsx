'use client'
import {FC, useEffect, useRef} from 'react';
import './adult-screen.scss';

//Animation
import logoAnimation from '../../../public/Assets/Animations/logo/delai_to_adults.json'

import TextLogo from '../text-logo/TextLogo';
import cn from 'classnames';
import { Transition } from 'react-transition-group';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import store from '@/store/store';

interface Props {
  isOpened: boolean
}

const transition = {transition: '0.4s ease-out'};

const AdultScreen: FC<Props> = ({ isOpened }) => { 
  const className = cn('adult-screen', isOpened ? 'opened' : '');
  const ref = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isOpened) {
       ref.current.play();
    } else {
      ref.current.goToAndStop(0);
    }
  },[isOpened])
  

  return (
    <div className={className}>
                
      <div className="adult-screen__logo-wrap">
            <div className="adult-screen__jap-logo-wrap logo-subtitle">
              <img
                src="/Assets/Slides/Animations/Images/Curtain/Logo-china.png"
                className='adult-screen__jap-logo' 
                style={transition}
                alt=""
              />
            </div>
        
            <Lottie 
              animationData={logoAnimation} 
              className='adult-screen__big-logo'
              loop={false}
              autoplay={false}
              lottieRef={ref}
            />

            <div className="adult-screen__text-logo-wrap logo-subtitle">
              <TextLogo className='adult-screen__text-logo'/>
            </div>
      </div>

      <Transition in={isOpened} timeout={300}>
        {state => (
          <img
            src="/Assets/Slides/Animations/Images/Curtain/Bandit.png"
            className='adult-screen__bandit' 
            alt=""
            style={{
              ...transition,
              ...{                
                unmounted: { right: '-100%'},
                entering: { right: '5%'},
                entered:  { right: '5%'},
                exiting:  { right: '-100%'},
                exited:  { right: '-100%'},
              }[state]
            }}
          />
        )}
      </Transition>
    </div>
  );
};

export default AdultScreen;