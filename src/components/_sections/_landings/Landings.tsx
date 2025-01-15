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
import ForKids from "@/components/_sections/for-kids/ForKids";
import ForAdult from "@/components/_sections/for-adult/ForAdult";
import {IFooters, ILadings, IMenuSectionTitle} from "@/typesData";

interface Props {
  direction: "right"|"left"
  landings?: ILadings|null
}

const styles = {
  unmounted: {translate: '0'},
  entering: {translate: '0'},
  entered: {translate: '0'},
  exiting:  {translate: '-100vw'},
  exited:  {translate: '-100vw'},
}

const Landings: FC<Props> = ({ direction, landings}) => {
  const { isLandingSwiped, swipeLanding } = store; 
  const isSectionSwiped=direction=="left"? isLandingSwiped:!isLandingSwiped

  if (!landings) return <div/>

  return (
    <Transition in={!isSectionSwiped} timeout={0}>
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
            <div className={classNames("landings-page", isSectionSwiped ? 'hidden' : '')}>
              <ForKids landingText={landings.kids}/>
            </div>
            <div className={classNames("landings-page", !isSectionSwiped ? 'hidden' : '')}>
              <ForAdult landingText={landings.adult}/>
            </div>
          </div>
        </div>
      ))}
    </Transition>
  );
};

export default observer(Landings);