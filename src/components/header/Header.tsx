'use client';
import {HeaderVariant, IWithClass} from '@/types';
import {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import cn from 'classnames';

import { modalHashes } from '@/vars';
import './header.scss';
import { useHash } from '../_hooks/useHash';
import { P, match } from 'ts-pattern';
import { observer } from 'mobx-react-lite';
import store from '@/store/store';
import { usePathname } from 'next/navigation';
import Lottie, {LottieRefCurrentProps} from "lottie-react";

import contactsIn from "@/app/assets/lottie/header/contacts/contacts_in.json"
import contactsHover from "@/app/assets/lottie/header/contacts/contacts_Mouse.json"
import contactOut from "@/app/assets/lottie/header/contacts/contacts_Out.json"

import logoKids from "@/app/assets/lottie/logo/delai_to_kids.json"
import logoAdults from "@/app/assets/lottie/logo/delai_to_adults.json"

import menuIn from "@/app/assets/lottie/header/menu/menu_IN.json"
import menuHover from "@/app/assets/lottie/header/menu/menu_Mouse.json"
import menuTrantionToClose from "@/app/assets/lottie/header/menu/menu_transition_to_X.json"
import closeHover from "@/app/assets/lottie/header/menu/X_Mouse.json"
import closeTrantionToMenu from "@/app/assets/lottie/header/menu/X_transition_to_menu.json"
import {useIsHome} from "@/components/_hooks/useIsHome";
import Link from "next/link";

type HeaderTheme = {
  hash: string, 
  isLandingSwiped: boolean, 
  isMenuLandingsOpened: boolean
  pathname: string
  isHome: boolean
}
interface LogoProps {
  variant: HeaderVariant
}

const addHash= (hash: string) => {
  setTimeout(()=>window.location.hash=hash, 180)
}
const Logo = ({ variant= 'normal'}: LogoProps) => {
  const pathname=usePathname()
  const hash=useHash()
  const {isLandingSwiped, prevHeaderVariant, changePrevHeaderVariant, changeMenuOpened}=store
  const ref= useRef(null)
  const objAnimation={
    kids: logoKids,
    adult: logoAdults,
  }
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animations, setAnimations] = useState<any[]>([])

  const handleComplete = () => {
    console.log(ref.current)
    console.log(`Анимация ${animationIndex + 1} завершена!`);
    (ref as unknown as MutableRefObject<LottieRefCurrentProps>).current?.setDirection(1)
    setAnimationIndex(prevIndex => prevHeaderVariant=="normal"? (prevIndex + 1) % animations.length: 0);

    console.log(animationIndex)
  }



  useEffect(() => {
    console.log('Пользователь перешёл с хэша: ' + prevHeaderVariant + ' на хэш: ' + variant);
    changePrevHeaderVariant(variant)
    // setAnimationIndex(0)
    console.log(animationIndex)
    let newArr: any[]=[]
    if (variant!="normal" &&(prevHeaderVariant=="normal" || variant==prevHeaderVariant)){
      newArr.push(objAnimation[variant]);
      console.log("prev normal")
      setAnimationIndex(0)
    }else if (variant=="kids" || variant=="adult") {
      setAnimationIndex(0);
      newArr=[objAnimation[variant]]
    }else if (variant=="normal"){
      console.log(prevHeaderVariant)
      newArr=[prevHeaderVariant!="normal"? objAnimation[prevHeaderVariant]: objAnimation.kids]
    }
    console.log(newArr)
    setAnimations(newArr)

  }, [isLandingSwiped, hash, pathname]);

  useEffect(() => {
    if (variant =="normal"){
      (ref as unknown as MutableRefObject<LottieRefCurrentProps>).current.setDirection(-1)
    }
    (ref as unknown as MutableRefObject<LottieRefCurrentProps>).current.play()
  }, [animations]);

  return (
      <Link href="/#main-screen" onClick={()=> {
        changeMenuOpened(false)
        addHash("main-screen")
      }}>
        <Lottie
            animationData={animations[animationIndex]}
            loop={false}
            autoplay
            onComplete={handleComplete}
            lottieRef={ref}
            className="header-logo"
        />
      </Link>
  )
}

const Mail = ({ color = ""}) => {
  const isHome= useIsHome()
  const [isHover, setIsHover] = useState(false);
  const [isWasHover, setIsWasHover] = useState(false);
  const ref= useRef(null)

  useEffect(() => {
    if (ref.current && isWasHover)
      (ref as unknown as MutableRefObject<LottieRefCurrentProps>).current.setSpeed(0.3)
  }, [ref.current, isHover]);
  return (
      <Link
          href={isHome? "#contacts":"/#contacts"}
          onClick={()=>addHash("contacts")}
          onMouseOver={() => {
            setIsHover(true);
            setIsWasHover(true);
          }}
          onMouseOut={() => setIsHover(false)}
      >
        <Lottie
            animationData={isHover? contactsHover :isWasHover? contactOut: contactsIn}
            loop={false}
            lottieRef={ref}
            className='header-mail'
        />
      </Link>
  )
}

const ButtonMenu = ({isOpen = false, cls = ''}) => {
  const [isHover, setIsHover] = useState(false);
  const {changeModalMenuOpened} = store;
  const [isWasHover, setIsWasHover] = useState(false);
  const menuRef = useRef(null);

  const changeDirectionAnimation = (ref: MutableRefObject<LottieRefCurrentProps | null>) => {
    ref.current?.play()
    if (isWasHover && !isHover) {
      ref.current?.setDirection(-1)
    } else {
      ref.current?.setDirection(1)
    }
  };

  useEffect(() => {
    changeDirectionAnimation(menuRef);

  }, [isWasHover, isHover]);

  return (
      <button
          onMouseOver={() => {
            setIsHover(true);
            setIsWasHover(true);
          }}
          onMouseOut={() => setIsHover(false)}
          onClick={()=>changeModalMenuOpened(true)}
      >
        <Lottie
            className='header-burger'
            animationData={isWasHover ? menuHover : menuIn}
            loop={false}
            lottieRef={menuRef}
        />
      </button>
  );
};

const Header: FC<IWithClass> = (props) => {
  const className = cn('header', props.className);
  const hash = useHash();
  const pathname = usePathname();
  const isHome= pathname=="/" || pathname=="/ru/"
  const {isLandingSwiped, isMenuLandingsOpened, changeMenuOpened} = store;
  const theme: HeaderTheme = {hash, isLandingSwiped, isMenuLandingsOpened, pathname, isHome};
  console.log({pathname, hash, isHome})

  return (
      <>
        {match(theme)
            // Страница проекта
            .with(
                {hash: '', pathname: P.when(() => pathname.includes('projects'))},
                () => (
                    <header className={cn(className, "white-header")}>
                      <div className='container'>
                        <Mail/>

                        <Logo variant="normal"/>

                        <ButtonMenu/>
                      </div>
                    </header>
                )
            )
            // Первый экран
            .with({hash: '', isMenuLandingsOpened: false, isHome: true}, {
              hash: 'main-screen',
              isMenuLandingsOpened: false,
              isHome: true
            }, () => (
                <header className={cn(className)}>
                  <div className='container'>
                    <Mail/>

                    <ButtonMenu/>
                  </div>
                </header>
            ))
            // Открыто меню выбора лэндоса
            .with({hash: '', isHome: true}, {hash: 'main-screen', isHome: true}, () => (
                <header className={className}>

                </header>
            ))
            // Детский дэндос
            .with(
        {hash: 'first-landing', isLandingSwiped: false, isHome:true},
        {hash: 'second-landing', isLandingSwiped: true, isHome: true},
        () => (
        <header className={cn(className, "white-header", "header-icon-blue")} >
                <div className='container'>
                  <Mail/>

                  <Logo variant="kids"/>

                  
                  <ButtonMenu/>
                </div>
              </header>
            )
          )
          // Взрослый лэндос 
          .with(
            {hash: 'first-landing', isLandingSwiped: true, isHome: true},
            {hash: 'second-landing', isLandingSwiped: false, isHome: true},
            () => (
              <header className={cn(className, "black-header", "header-icon-white")} >
                <div className='container'>
                  <Mail color="#fff"/>


                  <Logo variant="adult"/>


                  <ButtonMenu cls="white"/>
                </div>
              </header>
            )
          )
          // Меню
          .with(
            {hash: 'menu'},
            () => (
              <header className={cn(className, "hidden-header")} >
                <div className='container'>
                  <Mail />

                  <Logo variant="normal"/>


                  <ButtonMenu/>
                </div>
              </header>
            )
          )
          // Разделы Меню
          .with(
            {hash: P.when(() => modalHashes.includes(hash)), isHome: true},
            () => (
              <header className={cn(className, "white-header")} >
                <div className='container'>
                  <Mail />

                  <Logo variant="normal"/>


                  <ButtonMenu/>
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
                    <Mail />

                    <Logo variant="normal"/>


                    <ButtonMenu/>
                  </div>
                </header>
          ))

      }
    </>
  );
};

export default observer(Header);