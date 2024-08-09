'use client';
import { FC, ReactElement, ReactNode } from 'react';
import store from '@/store/store';
import { Transition } from 'react-transition-group';
import './landings.scss'
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { transitionStyles } from '@/vars';
import Showreel from '@/components/showreel/Showreel';
import LandingSwitchButton from '@/components/landing-switch-button/LandingSwitchButton';

interface Props {
  FirstLanding: ReactElement[]
  SecondLanding : ReactElement[]
}

const styles = {
  unmounted: {translate: '0'},
  entering: {translate: '0'},
  entered: {translate: '0'},
  exiting:  {translate: '-100vw'},
  exited:  {translate: '-100vw'},
}

const Landings: FC<Props> = ({FirstLanding, SecondLanding}) => {
  const { isLandingSwiped, swipeLanding } = store; 
  const [FirstComponent, FirstButton] = FirstLanding;
  const [SecondComponent, SecondButton] = SecondLanding;

  return (
    <Transition in={!isLandingSwiped} timeout={0}>
      {(state => (
        <div 
          className='landings'
        >
          <div
            className="landings-container"
            style={{
              ...styles[state],
              ...transitionStyles
            }}    
          >
            <div className={classNames("landings-page", isLandingSwiped ? 'hidden' : '')}>
              {FirstComponent}
            </div>
            <div className={classNames("landings-page", !isLandingSwiped ? 'hidden' : '')}>
              {SecondComponent}
            </div>
          </div>
        </div>
      ))}
    </Transition>
  );
};

export default observer(Landings);