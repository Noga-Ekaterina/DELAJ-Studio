'use client';
import { FC, useEffect } from 'react';
import logo from '../../public/images/logo.svg';
import './main.-screen.scss';
import LanguageToggle from '../components/language-toggle/LanguageToggle';
import store from '../store/store';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Font from 'next/font/local';

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
      <LanguageToggle className='main-screen__language'/>
    </div>
  );
};

export default observer(MainScreen);