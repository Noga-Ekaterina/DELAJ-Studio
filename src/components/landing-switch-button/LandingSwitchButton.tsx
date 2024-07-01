'use client';
import { CurrentPageType, IWithClass } from '@/types';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import './landing-switch-button.scss';
import store from '@/store/store';

interface Props extends IWithClass {
  render: () => ReactNode 
  handleClick: () => void
}

const LandingSwitchButton: FC<Props> = (props) => { 

  return (
    <div className={classNames('landing-switch-button__wrap', props.className)}>
      <button onClick={props.handleClick} className={'landing-switch-button'} type='button'>
          {props.render()}
      </button>
    </div>
  );
};

export default LandingSwitchButton;