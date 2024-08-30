'use client';
import {HeaderVariant, IWithClass} from '@/types';
import {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import cn from 'classnames';

import { sectionsMenuHashes } from '@/vars';
import './header.scss';
import { useHash } from '../_hooks/useHash';
import { P, match } from 'ts-pattern';
import { observer } from 'mobx-react-lite';
import store from '@/store/store';
import { usePathname } from 'next/navigation';
import Lottie, {LottieRefCurrentProps} from "lottie-react";

import contactsIn from "../../../public/Assets/Animations/header/contacts/contacts_In.json"
import contactsHover from "../../../public/Assets/Animations/header/contacts/contacts_Mouse.json"
import contactOut from "../../../public/Assets/Animations/header/contacts/contacts_Out.json"

import logoKids from "../../../public/Assets/Animations/logo/delai_to_kids.json"
import logoAdults from "../../../public/Assets/Animations/logo/delai_to_adults.json"

import menuIn from "../../../public/Assets/Animations/header/menu/menu_IN.json"
import menuHover from "../../../public/Assets/Animations/header/menu/menu_Mouse.json"

import {useIsHome} from "@/components/_hooks/useIsHome";
import Link from "next/link";
import {useLocale} from "@/components/_hooks/useLocale";

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
  const isHome=useIsHome()
  const locale=useLocale()
  const {isLandingSwiped, prevHeaderVariant, changePrevHeaderVariant, changeMenuOpened, changeCurrentPage}=store
  const ref= useRef<LottieRefCurrentProps | null>(null)
  const objAnimation={
    kids: logoKids,
    adult: logoAdults,
  }
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animations, setAnimations] = useState<any[]>([])

  const handleComplete = () => {
    console.log(ref.current)
    console.log(`Анимация ${animationIndex + 1} завершена!`);
    ref.current?.setDirection(1)
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
      ref.current?.setDirection(-1)
    }
    ref.current?.play()
  }, [animations]);

  return (
      <Link href={isHome? "": `/${locale}/#main-screen`} onClick={()=> {
        changeCurrentPage(null)
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

const Mail = () => {
  const {changeModalContactsOpened} = store;
  const [isHover, setIsHover] = useState(false);
  const [isWasHover, setIsWasHover] = useState(false);
  const ref= useRef<LottieRefCurrentProps | null>(null)

  useEffect(() => {
    if (ref.current && isWasHover)
      ref.current?.setSpeed(0.6)
  }, [ref.current, isHover]);
  return (
      <button
          onClick={()=>changeModalContactsOpened(true)}
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
      </button>
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
  const isHome= useIsHome()
  const {isLandingSwiped, isMenuLandingsOpened, changeMenuOpened} = store;
  const theme: HeaderTheme = {hash, isLandingSwiped, isMenuLandingsOpened, pathname, isHome};
  console.log({pathname, hash, isHome})

  return (
      <>
        {match(theme)
            // Страница проекта
            .when(
                () => pathname.includes('projects'),
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
                  <Mail/>


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
            {hash: P.when(() => sectionsMenuHashes.includes(hash)), isHome: true},
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
                () => pathname.includes('career'),
                () => (
                    <header className={cn(className, "hidden-header")}>
                      <div className='container'>
                        <Mail />
                        <Logo variant="normal" />
                        <ButtonMenu />
                      </div>
                    </header>
                )
            )
            .otherwise(()=> (
                <header className={cn(className, "white-header")}>
                  <div className='container'>
                    <Mail/>

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