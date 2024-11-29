'use client'
import React, {createContext, FC, memo, useEffect, useRef, useState} from 'react';
import './scroller.scss';
import { IWithChildren } from '@/types';
import { useHash } from '@/components/_hooks/useHash';
import { useViewport } from '@/components/_hooks/useViewport';
import store from '@/store/store';
import homeText from "@/store/text/home";
import projects from "@/store/text/Projects";
import { sectionsMenuHashes } from '@/vars';
import { observer } from 'mobx-react-lite';
import {useLoad} from "@/components/_hooks/useLoad";
import {usePathname, useRouter} from "next/navigation";
import {useChangeHash} from "@/components/_hooks/useChangeHash";

const Scroller: FC<IWithChildren> = (props) => {
  const pathname=usePathname()
  const hash = useHash();
  const viewport = useViewport();
  const {
    changeMenuOpened,
    changeCurrentPage,
    isModalMenuOpened,
    currentPage,
    showMainPage,
    isScrollOn
  }= store
  const scrollerContainerRef =useRef<HTMLDivElement | null>(null)
  const scrollerRef =useRef<HTMLDivElement | null>(null)
  let scrollDirection: "top"|"bottom"
  const [isAnimationPlay, setIsAnimationPlay] = useState(false)
  let scrollUpTimeout: NodeJS.Timeout | number
  let scrollTimeout: NodeJS.Timeout | number
  let scrollEndTimeout: NodeJS.Timeout | number
  let isEndTimeout: NodeJS.Timeout | number
  let isScrolling=false
  let isHiddenSection= false
  const isLoad=useLoad()
  const changeHash=useChangeHash()

  useEffect(() => {
    if (currentPage&&(hash=="main-screen" || hash=="")){
      window.scrollTo(0, 0)
    }
  }, [hash, currentPage]);

  let isAtBottom =false;
  let isAtTop=true
  let touchStartY: number|undefined = 0;

  function debounce<T extends any[]>(func: (...args: T) => void, delay: number) {
    let timeoutId: NodeJS.Timeout | undefined;

    return function (...args: T) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }



  const checkIfAtEnd = () => {
    if (scrollerContainerRef.current){

      if (window.scrollY>=(scrollerContainerRef.current as HTMLDivElement).clientHeight-window.innerHeight-4){
        isAtBottom= true
        isAtTop=false
        isScrolling= false
        // performScrollAction(0)
      }else {
        isAtBottom=false
      }

      if (window.scrollY==0){
        isAtTop= true;
        isAtBottom=false
        isScrolling= false
        // performScrollAction(0)
      }else {
        isAtTop=false
      }
    }
  };


  const performScrollAction = () => {
    // Если пользователь начал прокрутку или касание, сбросим таймер
    clearTimeout((scrollTimeout as number));

    const hash=window.location.hash.slice(1)
    console.log(isModalMenuOpened)
    // scrollTimeout = setTimeout(() => {
      if (!isScrolling &&hash!="" && hash!="main-screen" && scrollerContainerRef.current) {
        const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as HTMLDivElement).dataset.name==hash)
        isHiddenSection=false
        if (activeItem){
          const nextSection = (activeItem as HTMLDivElement).nextElementSibling;
          const prevSection = (activeItem as HTMLDivElement).previousElementSibling;
          const {bottom, top}=(activeItem as HTMLDivElement).getBoundingClientRect();

          console.log({isAtBottom, isAtTop})

          if (scrollDirection=="bottom" && bottom<200){
            if (nextSection) {
              (nextSection as HTMLDivElement).style.display="block"
              changeHash((nextSection as HTMLDivElement).dataset.name || '')
              // smoothScroll(bottom, 400)
            } else {
              changeHash("")
              changeCurrentPage(null)
              changeMenuOpened(false)
              console.log("end")
              // setTimeout(()=>{
              //   (activeItem as HTMLDivElement).style.display="none"
              // }, 1000)
            }
          }else if (scrollDirection=="top" && top>200){
            if (prevSection) {
              // (prevSection as HTMLDivElement).style   .cssText = `
              // display: block;
              // position: absolute;`;
              // const prevSectionHeight=(prevSection as HTMLDivElement).clientHeight;
              // (prevSection as HTMLDivElement).style.top= -prevSectionHeight+"px";
              //
              // setTimeout(()=>{
              //   (prevSection as HTMLDivElement).style.top='0';
              //
              //   if ((prevSection as HTMLDivElement).dataset.name!="empty-place")
              //     (activeItem as HTMLDivElement).style.transform = 'translateY(calc(100* var(--vh)))';
              // }, 50)
              //
              // setTimeout(()=>{
              //   (activeItem as HTMLDivElement).style.cssText=`
              //     display: none;
              //     transform: transplateY(0)
              //   `;
              //   (prevSection as HTMLDivElement).style.position="static";
              //
              //   clearTimeout((scrollTimeout as number));
              //   setIsAnimationPlay(false)
              // }, 550)
            }
            changeHash((prevSection as HTMLDivElement).dataset.name != "empty-place" ? (prevSection as HTMLDivElement).dataset.name || '' : "main-screen")
          }
        }
        clearTimeout((scrollTimeout as number));
      }
      // isHiddenSection=false
      // isScrolling = false;  // Сбросим флаг
      touchStartY=undefined
      // setIsAnimationPlay(true)
    // }, (timeout as number));
  };


  const handleEnd = () => {
    // Если пользователь начал прокрутку или касание, сбросим таймер
    clearTimeout((scrollTimeout as number));

    // isScrolling=true
    const hash=window.location.hash.slice(1)
    console.log(hash)
    const overflow=getComputedStyle(document.documentElement).overflow
    scrollTimeout = setTimeout(() => {
      if (overflow!="hidden"  && hash != "" && hash != "main-screen" && isScrollOn && scrollerContainerRef.current) {
        if (isAtBottom) {
          window.location.hash = ""
          isAtBottom=false
        }
        if (isAtTop)
          window.location.hash="main-screen"
      }
    }, 15)
  }

  const eventDisabled = (event: Event) => {
    if (scrollerContainerRef.current){
      const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as          HTMLDivElement).dataset.name==window.location.hash.slice(1))
      if (activeItem) {
        const {bottom, top} = (activeItem as HTMLDivElement).getBoundingClientRect();

        if (top>1 || bottom< window.innerHeight){
          event.preventDefault()
          console.log("preventD")
        }
      }
    }
  }

  function smoothScroll(distance: number, duration:number) {
    isScrolling = true;

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
        isScrolling = false; // Завершение анимации
      }
    }

    requestAnimationFrame(animation);
  }


  useEffect(() => {
    const handleScroll = () => {
      checkIfAtEnd();

      clearTimeout((scrollTimeout as number))

      if (scrollerContainerRef.current){
        const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as          HTMLDivElement).dataset.name==window.location.hash.slice(1))
        if (activeItem){
          const {bottom, top}=(activeItem as HTMLDivElement).getBoundingClientRect();

          if (top>=0 && top<=8) {
            setIsAnimationPlay(false)
          }
        }
      }
      performScrollAction()
    };


    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      let touchMoveY = event.touches[0].clientY;
      console.log({isAtBottom})
      if (touchStartY!=undefined){
        scrollDirection=touchMoveY<touchStartY? "bottom":"top"
        if ((isAtBottom && touchMoveY < touchStartY) || (isAtTop && touchMoveY > touchStartY)) {
          handleEnd()
        }
      }
      // eventDisabled(event)
    };

    window.addEventListener('scroll', handleScroll);

    window.addEventListener('wheel', (event) => {
      clearTimeout((scrollEndTimeout as number))
      scrollDirection=event.deltaY>0? "bottom":"top"
      if ((isAtBottom && event.deltaY > 0) || (isAtTop && event.deltaY < 0)) {
        handleEnd()
        // console.log("end")
      }

      eventDisabled(event)
    }, {passive: false});
    window.addEventListener('keydown', (event) => {
      if ((isAtBottom && (event.key === 'ArrowDown' || event.key === 'PageDown')) || (isAtTop && (event.key === 'ArrowUp' || event.key === 'PageUp'))) {
        handleEnd()
      }
    });
    window.addEventListener('touchstart', handleTouchStart, false);
    window.addEventListener('touchmove', handleTouchMove, false);
    window.addEventListener('touchend', e=> isScrolling=false)
    // window.addEventListener("hashchange", handleHash)

    // Очистка эффектов при размонтировании
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', performScrollAction);
      window.removeEventListener('keydown', performScrollAction);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Проверка начального состояния при загрузке компонента
  useEffect(() => {
    checkIfAtEnd();
    // scrolling()
  }, []);

  useEffect(() => {

    document.querySelectorAll("a[href^='#']").forEach(item=>{
      item.addEventListener("click", evt => {
        evt.preventDefault()
        const href=item.getAttribute("href")

        if (href){

          isScrolling=true

          const activeItem= document.querySelector(`[data-name='${href.slice(1)}']`)
          if (activeItem) {
            const {top} = (activeItem as HTMLDivElement).getBoundingClientRect();


            smoothScroll(top, 400)
            // (activeItem as HTMLDivElement).scrollIntoView({behavior: "smooth"})
          }
          setTimeout(()=> {
            changeHash(href.slice(1))
            isScrolling=false
          }, 400)
        }
      })
    })

  }, [isLoad, pathname, hash]);

  useEffect(() =>{
    if (scrollerContainerRef.current) {
      const activeItem = Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item => (item as HTMLDivElement).dataset.name == window.location.hash.slice(1))
      if (activeItem) {
        const {bottom, top} = (activeItem as HTMLDivElement).getBoundingClientRect();

        smoothScroll(top, 0)
        // changePageTransition('normal')
      }
    }
  }, [pathname, isLoad, showMainPage]);

  useEffect(() => {
    let touchStartY = 0;

    // wi-
    document.addEventListener('touchstart', function(event) {
      touchStartY = event.touches[0].clientY;
    }, { passive: false });

    document.addEventListener('touchend', function(event) {
      let touchEndY = event.changedTouches[0].clientY;
      if (touchEndY > touchStartY) {
        event.preventDefault();
      }
    }, { passive: false });


  }, []);

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