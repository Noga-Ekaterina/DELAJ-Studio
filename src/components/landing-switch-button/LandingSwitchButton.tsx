'use client';
import { CurrentPageType, IWithClass } from '@/types';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import './landing-switch-button.scss';
import store from '@/store/store';

interface Props extends IWithClass {
  render: () => JSX.Element
  to: CurrentPageType
}

const LandingSwitchButton: FC<Props> = (props) => {
  const className = classNames('landing-switch-button', props.className); 
  const { changeCurrentPage } = store;

  const handleClick = () => {
    changeCurrentPage(props.to)
  }

  return (
    <button onClick={handleClick} className={className} type='button'>
        {props.render()}
    </button>
  );
};

export default LandingSwitchButton;