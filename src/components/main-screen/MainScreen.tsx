'use client'
import { FC, useEffect, useRef, useState } from 'react';
import Lottie, {LottieRefCurrentProps} from "lottie-react";

//Animation
import logoAnimationOn from '../../../public/Assets/Animations/logo/delai_logo_In.json'
import logoAnimationOut from '../../../public/Assets/Animations/logo/delai_logo_Out.json';
import loaderLoop from "../../../public/Assets/Animations/loader/Loader_main_loop.json"
import loaderFinish from "../../../public/Assets/Animations/loader/Loader_main_finish.json"
import loaderHover from "../../../public/Assets/Animations/loader/Loader_main_hover.json"
import loaderOut from "../../../public/Assets/Animations/loader/Loader_main_OUT.json"
import ruAnimation from "../../../public/Assets/Animations/lang/RU.json"
import beamAnimation from "../../../public/Assets/Animations/lang/Beam.json"
import enAnimation from "../../../public/Assets/Animations/lang/EN.json"


import './main-screen.scss';
import LanguageToggle from '../language-toggle/LanguageToggle';
import store from '@/store/store';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { halvar } from '@/fonts';
import { Transition } from 'react-transition-group';
import { useHash } from '@/components/_hooks/useHash';
import PageMenu from '../page-menu/PageMenu';
import Curtain from "@/components/curtain/Сurtain";
import {useLoad} from "@/components/_hooks/useLoad";
import {changeOverflow} from "@/utils/changeOverflow";

const MainScreen: FC = () => {
  const {
    isMenuLandingsOpened,
    changeMenuOpened,
    changeCurrentPage,
    currentPage,
    showMainPage,
    changeShowMainPage,
    showMainScreen,
    changeShowMainScreen,
    isLandingSwiped,
    isScrollOn
  } = store;
  const [showArrow, setShowArrow] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isWasHover, setIsWasHover] = useState(false);
  const [isAnimationPlay, setIsAnimationPlay] = useState(true)
  const hash = useHash();
  const arrowRef = useRef<LottieRefCurrentProps | null>(null)
  const ruRef = useRef<LottieRefCurrentProps | null>(null)
  const enRef = useRef<LottieRefCurrentProps | null>(null)
  const containrRef=useRef(null)
  const [isShowLang, setIsShowLang] = useState(false)
  const isLoad=useLoad()

  const disabled = () => {
    if (containrRef.current!=null){
      (containrRef.current as HTMLDivElement).style.pointerEvents="none"
      setTimeout(()=>{
        if(containrRef.current)
          (containrRef.current as HTMLDivElement).style.pointerEvents=""
        // window.scrollTo(0,0)
      }, 900)
    }
  }
  const handleEvent = () => {
    if (!isLoad && !isAnimationPlay)
      changeMenuOpened(true);
  }

  useEffect(() => {
    console.log({isAnimationPlay, isLoad})
    if (!hash || !showMainPage) {
      console.log("hidden menu screen")
      changeMenuOpened(false);
      changeCurrentPage(null);
      changeShowMainScreen(true);
      disabled()
    } else if (hash === 'main-screen'){
      changeShowMainScreen(true);
      disabled()
    } else if (hash !== 'main-screen' && hash!=""){
      changeShowMainScreen(false);
      console.log("hidden main screen")

      if (hash!="first-landing")
        changeCurrentPage(null)
      else{
        if (isScrollOn)
          changeCurrentPage(isLandingSwiped? "adult":"kids")
      }
    }

  },[hash, showMainPage, isScrollOn])

  useEffect(() => {
    changeOverflow(hash=="" || hash=="main-screen" || !showMainPage)
  }, [hash, showMainPage]);

  useEffect(() => {
    if (!isLoad && !isAnimationPlay)
      changeShowMainPage(true)
  }, [isLoad, isAnimationPlay]);

  useEffect(() => {
    if (!isLoad && !isMenuLandingsOpened)
      setShowArrow(true)
  }, [isLoad, isMenuLandingsOpened]);

  useEffect(() => {
    if (isWasHover && !isHover) {
      arrowRef.current?.setDirection(-1)
      console.log("out")
    } else {
      arrowRef.current?.setDirection(1)
      console.log("over")
    }
    arrowRef.current?.play()
  }, [isHover, isWasHover]);

  useEffect(() => {
    if (isShowLang){
      ruRef.current?.play()
      enRef.current?.play()
    }
  }, [isShowLang]);

  return (
      <Curtain show={showMainScreen} zIndex={(currentPage || (hash!="" && hash!="main-screen"))? 4:3} className="main-screen">
        <div
            className="main-screen__content"
            onWheel={handleEvent}
            onTouchMove={handleEvent}
            ref={containrRef}
        >
          {(isMenuLandingsOpened && !currentPage)
              ? <Lottie
                  className='main-screen__logo'
                  animationData={logoAnimationOut}
                  loop={false}
                  onEnterFrame={() => setShowArrow(false)}
              />
              : <Lottie
                  className='main-screen__logo'
                  animationData={logoAnimationOn}
                  loop={false}
                  onComplete={() => setIsAnimationPlay(false)}
              />
          }

          <button
              className='main-screen__arrow'
              style={{pointerEvents: isLoad? "none":"auto"}}
              onMouseOver={() => {
                setIsHover(true);
                setIsWasHover(true);
              }}
              onMouseOut={() => setIsHover(false)}
              onClick={handleEvent}
          >
            <Lottie
                animationData={isLoad? loaderLoop: showArrow? isWasHover? loaderHover: loaderOut:loaderFinish}
                loop={isLoad}
                lottieRef={arrowRef}
            />
          </button>

          {
            (!isLoad &&(hash=='' ||hash=="main-screen"))&&
              <LanguageToggle
                  className={cn('main-screen__language', halvar.className)}
                  elements={[
                      <Lottie animationData={ruAnimation} loop={false} autoplay={false} lottieRef={ruRef}
                      key={"main-btn-ru"}/>,
                      <Lottie animationData={beamAnimation} loop={false} onComplete={()=> setIsShowLang(true)} key={"main-beam"}/>,
                      <Lottie animationData={enAnimation} loop={false} lottieRef={enRef} autoplay={false} key={"main-btn-en"}/>
                  ]}
              />
          }
        </div>
        <PageMenu/>
      </Curtain>

  );
};

export default observer(MainScreen);