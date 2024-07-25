'use client'
import React, { createContext, FC, useEffect, useRef, useState } from 'react';
import './scroller.scss';
import { IWithChildren } from '@/types';
import { useHash } from '@/components/_hooks/useHash';
import { useViewport } from '@/components/_hooks/useViewport';
import store from '@/store/store';
import { modalHashes } from '@/vars';

const Scroller: FC<IWithChildren> = (props) => {
  const hash = useHash();
  const viewport = useViewport();
  const [translate, setTranslate] = useState(0);
  const {changeMenuOpened, changeDidModal}= store
  const [lineStyles, setLineStyles] = useState('default');
  const isModal = modalHashes.includes(hash) || hash === 'menu';
  const scrollerContainerRef =useRef<HTMLDivElement | null>(null)
  const scrollerRef =useRef<HTMLDivElement | null>(null)
  const [scrollNumber, setScrollNumber] = useState(0)
  const [scrollDirection, setScrollDirection] = useState(true)
  const [isAnimationPlay, setIsAnimationPlay] = useState(false)
  let isScrollingTimeout: NodeJS.Timeout | number
  const [isScrolling, setIsScrolling] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [scrollDuration, setScrollDuration] = useState(0)
  const getPureHash = () => {
    const paramsIndex = hash.indexOf('?');
    return (paramsIndex > 0) ? hash.slice(0, paramsIndex) : hash.slice(0);
  }

// Функция для включения скролла
  function enableScroll() {
    setTimeout(() => {
      setIsAnimationPlay(false)
      setIsDisabled(false)
      console.log("anim end")
    }, 300)
  }

  // прокрутка
  useEffect(() => {
    if (hash && scrollerContainerRef.current) {
      const items = Array.from((scrollerContainerRef.current as HTMLDivElement).children)
      console.log(items)
      const activeItem= items.find(item=> (item as HTMLDivElement).dataset.name==hash)
      if (activeItem){
        const {bottom, top}=activeItem.getBoundingClientRect()
        console.log(activeItem.getBoundingClientRect().top)
        setIsAnimationPlay(true);
        (scrollerRef.current as HTMLDivElement).scrollBy({
          top: top,
          behavior: "smooth"
        });

      }

   }
  },[hash, viewport, scrollerContainerRef.current ?(scrollerContainerRef.current as HTMLDivElement).clientHeight :0]);

  useEffect(() => {
    const pureHash = getPureHash();

    switch(pureHash) {
      case 'career': {
        setLineStyles('caree')
      }
    }

    if (isModal)
      changeDidModal(true)
  },[hash])

  useEffect(() => {
    if (hash=="main-screen" && scrollerRef.current)
      (scrollerRef.current as HTMLDivElement).scrollTo(0,0)
  }, [hash]);
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // console.log('scroll')
    setIsScrolling(true)

    const scroll= (e.target as HTMLDivElement).scrollTop
    // Если позиция прокрутки не изменилась
    if (scroll === scrollNumber) {
      setScrollDuration(scrollDuration+100) // Увеличиваем счетчик времени на 100 мс (или любое значение, соответствующее вашему таймеру)

      // Если достигли 1000 мс (1 секунда)
      if (scrollDuration >= 600) {
        console.log('Пользователь прокручивает в одном месте уже 1 секунду.');
        setIsDisabled(false)
      }
    } else {
      // Если позиция изменилась, сбросить время
      setScrollDuration(0); // Сбрасываем счетчик времени
    }

    window.clearTimeout((isScrollingTimeout as number));

    isScrollingTimeout = setTimeout(function () {
      setIsScrolling(false)
      console.log('Пользователь перестал скроллить.');
    }, 200); // Таймаут в миллисекундах

    const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as             HTMLDivElement).dataset.name==hash)
    if (activeItem){
      const nextSection = activeItem
          .nextElementSibling;
      const prevSection = activeItem.previousElementSibling;
      const {bottom, top}=activeItem.getBoundingClientRect()
      // console.log(window.innerHeight - bottom)

      let stop
      if ((scrollDirection && window.innerHeight - bottom>=0) || (!scrollDirection && top>0 )) {
        const positionScroll = (scrollerRef.current as HTMLDivElement).scrollTop;
        console.log("disab")
        setIsDisabled(true)
      }


      if (scroll>scrollNumber){
        if (!isAnimationPlay  && window.innerHeight - bottom>2) {
          if (scrollDuration<600) {
            (e.target as HTMLDivElement).scrollTo({top: scrollNumber, behavior: "instant"})
          }else {
            setScrollDuration(0)
            setIsDisabled(false)
            if (nextSection) {
              window.location.hash = (nextSection as HTMLDivElement).dataset.name || ''
            } else {
              window.location.hash = "main-screen"
              changeMenuOpened(false)
              console.log("end")
            }
          }
        }
        setScrollDirection(true)
      }else if (scroll<scrollNumber) {
        if (!isAnimationPlay && top > 2 && prevSection) {
          if (scrollDuration<600) {
            (e.target as HTMLDivElement).scrollTo({top: scrollNumber, behavior: "instant"})
          }else {
            setScrollDuration(0)
            setIsDisabled(false)
            window.location.hash = (prevSection as HTMLDivElement).dataset.name != "empty-place" ? (prevSection as HTMLDivElement).dataset.name || '' : "main-screen"
          }
        }
        setScrollDirection(false)
      }
      console.log({item: (activeItem as HTMLDivElement).dataset.name, bottom, top})
      if (isAnimationPlay){
        if (top<0.4){
          enableScroll()
        }
        // else if (!scrollDirection && window.innerHeight - bottom<10){
        //   enableScroll()
        // }
      }
    }
    // console.log(scrollerRef.current.scrollTop)
    setScrollNumber(scroll)
  }

  useEffect(() => {
    let touchStartY = 0;

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
         onScroll={e=>onScroll(e)}
         ref={scrollerRef}
    >
      <div 
        className="scroller-content"
        style={{transform:  `translateY(calc(${translate}px - 56rem))`}}
        ref={scrollerContainerRef}
      >
      
        {props.children}  
      </div>

      {/* Цветные линии сверху и снизу */}
      <div 
          className="outline topline"
          style={{
            'career' : { color: '#00C2FF'},
            'ideas' : { color: "#8BE200"},
            'contacts' : { color: '#007BAD' },
            'faq' : { color: '#FF1267' },
            'about' : { color: '#F12B00' }  
          }[getPureHash()] || {display: 'none'}} 
        ></div>
      <div 
        className="outline underlines"
        style={{display: isModal ? 'flex' : 'none'}}
      >
        <div className="underlines-item blue"></div>
        <div className="underlines-item yellow"></div>
        <div className="underlines-item red"></div>
        <div className="underlines-item purple"></div>
      </div>
    </div>
  );
};

export default Scroller;