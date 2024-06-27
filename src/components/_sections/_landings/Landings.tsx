'use client';
import { FC } from 'react';
import ForKids from '../for-kids/ForKids';
import ForAdult from '../for-adult/ForAdult';
import store from '@/store/store';
import { Transition } from 'react-transition-group';
import './landings.scss'
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { CurrentPageType } from '@/types';
import { transitionStyles } from '@/vars';
import { useSearchParams } from 'next/navigation';
import Showreel from '@/components/showreel/Showreel';

interface Props {
  first: CurrentPageType
}

const styles = {
  unmounted: {translate: '0'},
  entering: {translate: '0'},
  entered: {translate: '0'},
  exiting:  {translate: '-100vw'},
  exited:  {translate: '-100vw'},
}

const Landings: FC<Props> = (props) => {
  const { currentPage } = store;
  
  const pageKey = currentPage || 'kids';
  const isThisPage = props.first === pageKey; 

  const hideNotCurrent = (key: CurrentPageType) => {
    if (key !== pageKey) return 'hidden';
  }

  return (
    <Transition in={isThisPage} timeout={0}>
      {(state => (
        <div 
          className='landings'
        >
          <Showreel className='landings-showreel'/>
          <div 
            className="landings-container"
            style={{
              ...styles[state],
              ...transitionStyles
            }}    
          >
            <div className={classNames("landings-page", hideNotCurrent('kids'))}>
              <ForKids />
            </div>
            <div className={classNames("landings-page", hideNotCurrent('adult'))}>
              <ForAdult />
            </div>
          </div>
        </div>
      ))}
    </Transition>
  );
};

export default observer(Landings);