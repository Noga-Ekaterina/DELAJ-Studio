'use client'
import React, {createContext, FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import './scroller.scss';
import { IWithChildren } from '@/types';
import { useHash } from '@/components/_hooks/useHash';
import { useViewport } from '@/components/_hooks/useViewport';
import store from '@/store/store';
import { sectionsMenuHashes } from '@/vars';
import { observer } from 'mobx-react-lite';
import {useLoad} from "@/components/_hooks/useLoad";
import {usePathname, useRouter} from "next/navigation";
import {useChangeHash} from "@/components/_hooks/useChangeHash";

const Scroller: FC<IWithChildren> = (props) => {
  const pathname = usePathname();
  const hash = useHash();
  const viewport = useViewport();
  const isLoad = useLoad();
  const changeHash = useChangeHash();

  const {
    changeMenuOpened,
    changeCurrentPage,
    showMainPage
  } = store;

  // Refs для DOM элементов и значений
  const scrollerContainerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{
    scroll: NodeJS.Timeout | null;
    scrollEnd: NodeJS.Timeout | null;
    scrollUp: NodeJS.Timeout | null;
  }>({
    scroll: null,
    scrollEnd: null,
    scrollUp: null
  });

  const stateRef = useRef({
    isStart: true,
    isScrolling: false,
    isAtBottom: false,
    isAtTop: false,
    scrollDirection: "top" as "top" | "bottom",
    touchStartY: undefined as undefined | number
  });

  const checkIfAtEnd = useCallback(() => {
    if (scrollerContainerRef.current && !stateRef.current.isStart){

      if (window.scrollY>=(scrollerContainerRef.current as HTMLDivElement).clientHeight-window.innerHeight-4){
        stateRef.current.isAtBottom= true
        stateRef.current.isAtTop=false
        stateRef.current.isScrolling= false
        // performScrollAction(0)
      }else {
        stateRef.current.isAtBottom=false
      }

      if (window.scrollY==0){
        stateRef.current.isAtTop= true;
        stateRef.current.isAtBottom=false
        stateRef.current.isScrolling= false
        // performScrollAction(0)
      }else {
        stateRef.current.isAtTop=false
      }
    }
  }, [])


  const performScrollAction = useCallback(() => {
    // Если пользователь начал прокрутку или касание, сбросим таймер
    if (timersRef.current.scroll)
      clearTimeout(timersRef.current.scroll);

    const hash=window.location.hash.slice(1)
      if (!stateRef.current.isScrolling &&hash!="" && hash!="main-screen" && scrollerContainerRef.current) {
        const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as HTMLDivElement).dataset.name==hash)
        if (activeItem){
          const nextSection = (activeItem as HTMLDivElement).nextElementSibling;
          const prevSection = (activeItem as HTMLDivElement).previousElementSibling;
          const {bottom, top}=(activeItem as HTMLDivElement).getBoundingClientRect();

          if (stateRef.current.scrollDirection=="bottom" && bottom<200){
            if (nextSection) {
              (nextSection as HTMLDivElement).style.display="block"
              changeHash((nextSection as HTMLDivElement).dataset.name || '')
              // smoothScroll(bottom, 400)
            } else {
              changeHash("")
              changeCurrentPage(null)
              changeMenuOpened(false)
            }
          }else if (stateRef.current.scrollDirection=="top" && top>200){
            changeHash((prevSection as HTMLDivElement).dataset.name != "empty-place" ? (prevSection as HTMLDivElement).dataset.name || '' : "main-screen")
          }
        }

        if (timersRef.current.scroll)
          clearTimeout(timersRef.current.scroll);
      }
      // isHiddenSection=false
      // stateRef.current.isScrolling = false;  // Сбросим флаг
      stateRef.current.touchStartY=undefined
      // setIsAnimationPlay(true)
    // }, (timeout as number));
  }, []);


  const handleEnd =useCallback(() => {
    // Если пользователь начал прокрутку или касание, сбросим таймер
    if (timersRef.current.scroll)
      clearTimeout(timersRef.current.scroll);

    // stateRef.current.isScrolling=true
    const hash=window.location.hash.slice(1)
    const overflow=getComputedStyle(document.documentElement).overflow
    timersRef.current.scroll = setTimeout(() => {
      if (overflow!="hidden"  && hash != "" && hash != "main-screen" && scrollerContainerRef.current) {
        if (stateRef.current.isAtBottom) {
          changeHash("")
          stateRef.current.isAtBottom=false

          setTimeout(()=> window.scrollTo(0,0), 700)
        }
        if (stateRef.current.isAtTop)
          changeHash("main-screen")
      }
    }, 15)
  }, [])

  const eventDisabled = useCallback((event: Event) => {
    if (scrollerContainerRef.current){
      const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as          HTMLDivElement).dataset.name==window.location.hash.slice(1))
      if (activeItem) {
        const {bottom, top} = (activeItem as HTMLDivElement).getBoundingClientRect();

        if (top>1 || bottom< window.innerHeight){
          event.preventDefault()
        }
      }
    }
  }, [])

  const smoothScroll= useCallback((distance: number, duration:number) =>{
    stateRef.current.isScrolling = true;

    const startScrollPosition = window.scrollY;
    const startTime = performance.now();

    function animation(currentTime: number) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function (You can change to another easing function if you want)
      const ease = progress * (2 - progress); // easeInOutQuad
      const currentScrollPosition = startScrollPosition + distance * ease;

      window.scrollTo(0, currentScrollPosition);

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        stateRef.current.isScrolling = false; // Завершение анимации
      }
    }

    requestAnimationFrame(animation);
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      checkIfAtEnd();

      if(timersRef.current.scroll)
      clearTimeout(timersRef.current.scroll)

      if (scrollerContainerRef.current){
        const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as          HTMLDivElement).dataset.name==window.location.hash.slice(1))
        if (activeItem){
          const {bottom, top}=(activeItem as HTMLDivElement).getBoundingClientRect();

          if (top>=0 && top<=8) {
            // setIsAnimationPlay(false)
          }
        }
      }
      performScrollAction()
    };

    const handleWheel=(event: WheelEvent) => {
      if (timersRef.current.scrollEnd)
        clearTimeout(timersRef.current.scrollEnd)

      stateRef.current.scrollDirection=event.deltaY>0? "bottom":"top"
      if ((stateRef.current.isAtBottom && event.deltaY > 0) || (stateRef.current.isAtTop && event.deltaY < 0)) {
        handleEnd()
      }

      eventDisabled(event)
    }

    const handleKeydown=(event: KeyboardEvent) => {
      if ((stateRef.current.isAtBottom && (event.key === 'ArrowDown' || event.key === 'PageDown')) || (stateRef.current.isAtTop && (event.key === 'ArrowUp' || event.key === 'PageUp'))) {
        handleEnd()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      stateRef.current.touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      let touchMoveY = event.touches[0].clientY;
      if (stateRef.current.touchStartY!=undefined){
        stateRef.current.scrollDirection=touchMoveY<stateRef.current.touchStartY? "bottom":"top"
        if ((stateRef.current.isAtBottom && touchMoveY < stateRef.current.touchStartY) || (stateRef.current.isAtTop && touchMoveY > stateRef.current.touchStartY)) {
          handleEnd()
        }
      }
      // eventDisabled(event)
    };

    window.addEventListener('scroll', handleScroll);

    window.addEventListener('wheel', handleWheel, {passive: false});
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('touchstart', handleTouchStart, false);
    window.addEventListener('touchmove', handleTouchMove, false);
    window.addEventListener('touchend', e=> stateRef.current.isScrolling=false)

    // Очистка эффектов при размонтировании
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // вешаем onclick на ссылки якоря
  useEffect(() => {
    const handleAnchorClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (!anchor) return;

      event.preventDefault();
      const href = anchor.getAttribute('href');

      if (!href) return;

      stateRef.current.isScrolling = true;
      const targetElement = document.querySelector(`[data-name='${href.slice(1)}']`) as HTMLElement;

      if (targetElement) {
        const { top } = targetElement.getBoundingClientRect();
        smoothScroll(top, 400)

        setTimeout(()=> {
          changeHash(href.slice(1))
          stateRef.current.isScrolling=false
        }, 400)
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []); // Эффект выполняется только один раз при монтировании

  // прокручиваем к разделу при открытии стр
  useEffect(() =>{
    if (scrollerContainerRef.current && isLoad && stateRef.current.isStart) {

      const activeItem = Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item => (item as HTMLDivElement).dataset.name == window.location.hash.slice(1))
      if (activeItem) {
        window.scrollTo(0,0)
        const {bottom, top} = (activeItem as HTMLDivElement).getBoundingClientRect();

        smoothScroll(top, 0)

        setTimeout(()=> {
          stateRef.current.isStart = false
          checkIfAtEnd()
        }, 100)
      }else {
        stateRef.current.isStart=false
        checkIfAtEnd()
      }
    }
  }, [pathname, isLoad]);

  return (

    <div className='scroller'
         // onScroll={e=>onScroll(e)}
         ref={scrollerRef}
    >
      <div
        className="scroller-content"
        ref={scrollerContainerRef}
      >

        {props.children}
      </div>
    </div>
  );
};

export default memo(observer(Scroller));