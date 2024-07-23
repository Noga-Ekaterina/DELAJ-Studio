'use client';
import { IWithClass } from '@/types';
import {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import cn from 'classnames';
import Image from 'next/image';

//Images
import kidsLogo from '../../../public/images/kids-header-logo.svg';  
import adultLogo from '../../../public/images/adult-header-logo.svg';
import logo from '../../../public/images/logo.svg';
import burger from '../../../public/images/header-burger.svg';
import blueBurger from '../../../public/images/blue-burger.svg';
import darkBurger from '../../../public/images/dark-burger.svg';
import mail from '../../../public/images/mail.svg';
import whiteMail from '../../../public/images/white-mail.svg';
import blueMail from '../../../public/images/blue-mail.svg';
import whiteLogo from '../../../public/images/white-logo.svg'
import close from '../../../public/images/close.svg';
import { modalHashes } from '@/vars';
import './header.scss';
import { useHash } from '../_hooks/useHash';
import { P, match } from 'ts-pattern';
import { observer } from 'mobx-react-lite';
import store from '@/store/store';
import { usePathname } from 'next/navigation';
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import menuIn from "../../app/assets/lottie/menu_IN.json"
import menuHover from "../../app/assets/lottie/menu_Mouse.json"
import menuTrantionToClose from "../../app/assets/lottie/menu_transition_to_X.json"
import closeHover from "../../app/assets/lottie/X_Mouse.json"
import closeTrantionToMenu from "../../app/assets/lottie/X_transition_to_menu.json"

type HeaderTheme = {
  hash: string, 
  isLandingSwiped: boolean, 
  isMenuLandingsOpened: boolean
  pathname: string
}

const ButtonMenu = ({isOpen = false, cls = ''}) => {
  const [isHover, setIsHover] = useState(false);
  const { isDidModal } = store;
  const [isWasHover, setIsWasHover] = useState(false);
  const closeRef = useRef(null);
  const menuRef = useRef(null);

  const changeDirectionAnimation = (ref: MutableRefObject<LottieRefCurrentProps | null>) => {
    ref.current?.play()
    if (isWasHover && !isHover){
      ref.current?.setDirection(-1)
    }else {
      ref.current?.setDirection(1)
    }
  };

  useEffect(() => {
    changeDirectionAnimation(menuRef);
    changeDirectionAnimation(closeRef);

  }, [isWasHover, isHover]);

  return (
      <a
          href={!isOpen ? "#menu" : "#main-screen"}
          className={`icon-${cls}`}
          onMouseOver={() => {
            setIsHover(true);
            setIsWasHover(true);
          }}
          onMouseOut={() => setIsHover(false)}
      >
        { !isOpen?
            <Lottie
                className='header-burger'
                animationData={isWasHover ? menuHover : isDidModal ? closeTrantionToMenu : menuIn}
                loop={false}
                lottieRef={menuRef}
            />
            : <Lottie
                className='header-close'
                animationData={isWasHover ? closeHover : menuTrantionToClose}
                loop={false}
                lottieRef={closeRef}
            />


        }
      </a>
  );
};

const Header: FC<IWithClass> = (props) => {
  const className = cn('header', props.className);
  const hash = useHash();
  const pathname = usePathname();
  const { isLandingSwiped, isMenuLandingsOpened, changeMenuOpened } = store;
  const theme: HeaderTheme = {hash, isLandingSwiped, isMenuLandingsOpened, pathname};
  
    return (
      <>
        {match(theme)
          // Страница проекта
          .with(
            {hash: '', pathname: P.when(() => pathname.includes('projects'))},
            () => (
                <header className={cn(className, "white-header")}>
                  <div className='container'>
                    <a href="#contacts">
                      <Image className='header-mail' src={blueMail} alt=""/>
                    </a>

                    <ButtonMenu/>
                  </div>
                </header>
          )
          )
          // Первый экран
          .with({hash: '', isMenuLandingsOpened: false, pathname: '/'}, {hash: 'main-screen', isMenuLandingsOpened: false}, () => (
                <header className={cn(className, "white-header", 'yes')}>
                  <div className='container'>
                    <a href="#contacts">
                      <Image className='header-mail' src={mail} alt=""/>
                    </a>

                    <ButtonMenu/>
                  </div>
                </header>
            ))
            // Открыто меню выбора лэндоса
            .with({hash: ''}, {hash: 'main-screen'}, () => (
                <header className={className}>

                </header>
          ))
          // Детский дэндос
          .with(
        {hash: 'first-landing', isLandingSwiped: false},
        {hash: 'second-landing', isLandingSwiped: true},
        () => (
        <header className={cn(className, "white-header")} >
                <div className='container'>
                  <a href="#contacts">
                    <Image className='header-mail' src={blueMail} alt=""/>
                  </a>

                  <a href="#main-screen">
                    <Image className='header-logo' src={kidsLogo} alt=""/>
                  </a>
                  
                  <ButtonMenu cls="blue"/>
                </div>
              </header>
            )
          )
          // Взрослый лэндос 
          .with(
            {hash: 'first-landing', isLandingSwiped: true},
            {hash: 'second-landing', isLandingSwiped: false},
            () => (
              <header className={cn(className, "black-header")} >
                <div className='container'>
                  <a href="#contacts">
                    <Image className='header-mail' src={whiteMail} alt=""/>
                  </a>

                  <a href="#main-screen">
                    <Image className='header-logo' src={adultLogo} alt=""/>
                  </a>

                  <ButtonMenu cls="white"/>
                </div>
              </header>
            )
          )
          // Меню
          .with(
            {hash: 'menu'},
            () => (
              <header className={cn(className)} >
                <div className='container'>
                  <a>
                    <Image className='header-mail menu-mail' src={mail} alt=""/>
                  </a>

                  <a href="#main-screen">
                    <Image className='header-logo' src={logo} alt=""/>
                  </a>

                  <ButtonMenu isOpen={true}/>
                </div>
              </header>
            )
          )
          // Разделы Меню
          .with(
            {hash: P.when(() => modalHashes.includes(hash))},
            () => (
              <header className={cn(className)} >
                <div className='container'>
                  <a>
                    <Image className='header-mail menu-mail' src={mail} alt=""/>
                  </a>

                  <a href="#main-screen">
                    <Image className='header-logo' src={logo} alt=""/>
                  </a>

                  <ButtonMenu isOpen={true}/>
                </div>
              </header>
            )
          )
            // Страница вакансии
            .when(
                () => hash.includes('career?id='),
                () => null
            )
            .otherwise(() => (
                <header className={cn(className)}>
                  <div className='container'>
                    <a href="#contacts">
                    <Image className='header-mail menu-mail' src={mail} alt=""/>
                </a>

                <a href="#main-screen">
                  <Image className='header-logo' src={logo} alt=""/>
                </a>
                
                <ButtonMenu/>
              </div>
            </header>
          ))
      }
    </>
  );
};

export default observer(Header);