'use client';
import { FC } from 'react';
import logo from '../../public/images/logo.svg';
import './main-screen.scss';
import LanguageToggle from '../components/language-toggle/LanguageToggle';
import store from '../store/store';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import cn from 'classnames';
import { halvar } from '@/fonts';

const MainScreen: FC = () => {
  const {isMenuOpened} = store;
  const {changeMenuOpened} = store;

  const handleEvent = () => {
    changeMenuOpened(true);
  }

  return (
    <div 
      className='main-screen' 
      onWheel={handleEvent} 
      style={{zIndex: isMenuOpened ? -1 : 1}}
    >
      <Image src={logo} alt="" />
      <LanguageToggle className={cn('main-screen__language', halvar.className)}/>
    </div>
  );
};

export default observer(MainScreen);