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
import {IFooters, ILadingsText, IMenuSectionTitle, IProjectsList} from "@/typesData";
import {IProject} from "@/types";

interface Props {
  direction: "right"|"left"
  landings?: ILadingsText|null
  projectsList?: null|IProjectsList

}

const styles = {
  unmounted: {translate: '0'},
  entering: {translate: '0'},
  entered: {translate: '0'},
  exiting:  {translate: '-100vw'},
  exited:  {translate: '-100vw'},
}

const Landings: FC<Props> = ({ direction, landings, projectsList}) => {
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
              <ForKids landingText={landings.kids} projects={projectsList?.kids}/>
            </div>
            <div className={classNames("landings-page", !isSectionSwiped ? 'hidden' : '')}>
              <ForAdult landingText={landings.adult} projects={projectsList?.adults}/>
            </div>
          </div>
        </div>
      ))}
    </Transition>
  );
};

export default observer(Landings);