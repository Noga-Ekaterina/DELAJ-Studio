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
  const {changeMenuOpened, isModalMenuOpened}= store
  const [lineStyles, setLineStyles] = useState('default');
  const isModal = modalHashes.includes(hash) || hash === 'menu';
  const scrollerContainerRef =useRef<HTMLDivElement | null>(null)
  const scrollerRef =useRef<HTMLDivElement | null>(null)
  let scrollDirection= true
  const [isAnimationPlay, setIsAnimationPlay] = useState(false)
  let scrollTimeout: NodeJS.Timeout | number
  let scrollEndTimeout: NodeJS.Timeout | number
  let isEndTimeout: NodeJS.Timeout | number
  let isScrolling=false
  let isHiddenSection= false
  const [isDisabled, setIsDisabled] = useState(false)
  let scrollDuration=0
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
    }, 500)
  }


  // прокрутка
  useEffect(() => {
    if (hash && scrollerContainerRef.current) {
      console.log('hash scroll')
      const items = Array.from((scrollerContainerRef.current as HTMLDivElement).children)
      console.log(items)
      const activeItem= items.find(item=> (item as HTMLDivElement).dataset.name==hash)
      if (activeItem){
        const {bottom, top}=activeItem.getBoundingClientRect()
        console.log(activeItem.getBoundingClientRect().top);
        // setIsAnimationPlay(true);
        // window.scrollBy({
        //   top: top+8,
        //   behavior: "smooth"
        // });

            (activeItem as HTMLDivElement).style.display="block"
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
  },[hash])

  useEffect(() => {
    if (hash=="main-screen" && scrollerRef.current)
      window.scrollTo(0,0)
  }, [hash]);
  // const onScroll = (e: Event) => {
  //   // console.log('scroll')
  //   setIsScrolling(true)
  //
  //   const scroll= window.scrollY
  //   const previousScrollNumber=scrollNumber
  //   console.log({scroll, previousScrollNumber})
  //   // Если позиция прокрутки не изменилась
  //   if (scroll === previousScrollNumber) {
  //     scrollDuration= scrollDuration+100 // Увеличиваем счетчик времени на 100 мс (или любое значение, соответствующее вашему таймеру)
  //
  //     // Если достигли 1000 мс (1 секунда)
  //     if (scrollDuration >= 1000) {
  //       console.log('Пользователь прокручивает в одном месте уже 1 секунду.');
  //       setIsDisabled(false)
  //     }
  //   } else
  //   {
  //     // Если позиция изменилась, сбросить время
  //     scrollDuration=0; // Сбрасываем счетчик времени
  //   }
  //
  //   window.clearTimeout((isScrollingTimeout as number));
  //
  //   isScrollingTimeout = setTimeout(function () {
  //     setIsScrolling(false)
  //     console.log('Пользователь перестал скроллить.');
  //   }, 200); // Таймаут в миллисекундах
  //
  //   const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as             HTMLDivElement).dataset.name==window.location.hash.slice(1))
  //   // console.log({scrollDuration, isAnimationPlay})
  //   // console.log(activeItem)
  //   // console.log(window.location.hash)
  //   if (activeItem){
  //     const nextSection = activeItem
  //         .nextElementSibling;
  //     const prevSection = activeItem.previousElementSibling;
  //     const {bottom, top}=activeItem.getBoundingClientRect()
  //     // console.log(window.innerHeight - bottom)
  //
  //     let stop
  //     if ((scrollDirection && window.innerHeight - bottom>=0) || (!scrollDirection && top>0 )) {
  //       console.log("disab")
  //       setIsDisabled(true)
  //     }
  //
  //     console.log(scrollDuration)
  //
  //
  //     if (scroll>previousScrollNumber){
  //       console.log("down")
  //       if (!isAnimationPlay  && window.innerHeight - bottom>2) {
  //         console.log("end")
  //         if (scrollDuration<1000) {
  //           window.scrollTo({top: previousScrollNumber, behavior: "instant"})
  //           console.log("stop")
  //         }else {
  //           scrollDuration=0
  //           setIsDisabled(false)
  //           if (nextSection) {
  //             window.location.hash = (nextSection as HTMLDivElement).dataset.name || ''
  //           } else {
  //             window.location.hash = "main-screen"
  //             changeMenuOpened(false)
  //             console.log("end")
  //           }
  //         }
  //       }
  //       setScrollDirection(true)
  //     }else if (scroll<previousScrollNumber) {
  //       if (!isAnimationPlay && top > 2 && prevSection) {
  //         if (scrollDuration<1000) {
  //           window.scrollTo({top: previousScrollNumber, behavior: "instant"})
  //         }else {
  //           scrollDuration=0
  //           setIsDisabled(false)
  //           window.location.hash = (prevSection as HTMLDivElement).dataset.name != "empty-place" ? (prevSection as HTMLDivElement).dataset.name || '' : "main-screen"
  //         }
  //       }
  //       setScrollDirection(false)
  //     }
  //     // console.log({item: (activeItem as HTMLDivElement).dataset.name, bottom, top})
  //     if (isAnimationPlay){
  //       if (top<0.4){
  //
  //         enableScroll()
  //       }
  //       // else if (!scrollDirection && window.innerHeight - bottom<10){
  //       //   enableScroll()
  //       // }
  //     }
  //   }
  //   // console.log(scrollerRef.current.scrollTop)
  //   scrollNumber=scroll
  // }

  let isAtBottom =false;
  let isAtTop=true
  let touchStartY = 0;

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
    clearTimeout((isEndTimeout as number))
    const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as             HTMLDivElement).dataset.name==window.location.hash.slice(1))
    console.log(scrollDirection)
    if (activeItem){
      const {bottom, top}=(activeItem as HTMLDivElement).getBoundingClientRect()

      console.log({bottom, top})

      if (window.innerHeight - bottom >=-5 && top<=0){
        isEndTimeout= setTimeout(()=>{
          isAtBottom= true;
        }, 500)
        isAtTop=false
        isScrolling= false
      }else {
        isAtBottom=false
      }

      if (top>=-1){
        isEndTimeout= setTimeout(()=>{
          isAtTop= true;
        }, 500)
        isAtBottom=false
        isScrolling= false
      }else {
        isAtTop=false
      }
    }
  };


  const performScrollAction = (timeout: number| Event) => {
    // Если пользователь начал прокрутку или касание, сбросим таймер
    clearTimeout((scrollTimeout as number));
    isScrolling = true;

    scrollTimeout = setTimeout(() => {
      if (isScrolling && !isModalMenuOpened && !isAnimationPlay) {
        console.log('Пользователь непрерывно прокручивает/листает в течение 1 секунды');
        const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as          HTMLDivElement).dataset.name==window.location.hash.slice(1))
        isHiddenSection=false
        if (activeItem){
          const nextSection = (activeItem as HTMLDivElement).nextElementSibling;
          const prevSection = (activeItem as HTMLDivElement).previousElementSibling;
          const {bottom, top}=(activeItem as HTMLDivElement).getBoundingClientRect();

          console.log({isAtBottom, isAtTop})

          if (isAtBottom){
            if (nextSection) {
              (nextSection as HTMLDivElement).style.display="block"
              window.location.hash = (nextSection as HTMLDivElement).dataset.name || ''
            } else {
              window.location.hash = "main-screen"
              changeMenuOpened(false)
              console.log("end")
            }
          }else if (isAtTop){
            if (prevSection) {
              // (prevSection as HTMLDivElement).style.cssText = `
              // display: block;
              // position: absolute;`;
              // const prevSectionHeight=(prevSection as HTMLDivElement).clientHeight;
              // (prevSection as HTMLDivElement).style.top= -prevSectionHeight+"px";
              //
              // setTimeout(()=>{
              //   (activeItem as HTMLDivElement).style.transform = 'translateY(100vh)';
              //   (prevSection as HTMLDivElement).style.top='0';
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
            window.location.hash = (prevSection as HTMLDivElement).dataset.name != "empty-place" ? (prevSection as HTMLDivElement).dataset.name || '' : "main-screen"
          }
        }
        clearTimeout((scrollTimeout as number));
      }
      // isHiddenSection=false
      isScrolling = false;  // Сбросим флаг
      setIsAnimationPlay(true)
    }, (timeout as number));
  };

  const eventDisabled = (event: Event) => {
    const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as          HTMLDivElement).dataset.name==window.location.hash.slice(1))
    if (activeItem) {
      const {bottom, top} = (activeItem as HTMLDivElement).getBoundingClientRect();

      if (top>=0 || bottom< window.innerHeight)
        event.preventDefault()
    }
  }

  const handleTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0].clientY;
  };

  const handleTouchMove = (event: TouchEvent) => {
    let touchMoveY = event.touches[0].clientY;
    console.log({isAtBottom})
    if ((isAtBottom && touchMoveY < touchStartY) || (isAtTop && touchMoveY > touchStartY)) {
      performScrollAction(20);
    }
    eventDisabled(event)
  };

  useEffect(() => {
    const debouncedCheckIfAtEnd = debounce(checkIfAtEnd, 100);

    const handleScroll = () => {
      debouncedCheckIfAtEnd();

      clearTimeout((scrollTimeout as number))
      const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as          HTMLDivElement).dataset.name==window.location.hash.slice(1))
      if (activeItem){
        const {bottom, top}=(activeItem as HTMLDivElement).getBoundingClientRect();

        if (top>=0 && top<=8) {
          setIsAnimationPlay(false)
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    window.addEventListener('wheel', (event) => {
      clearTimeout((scrollEndTimeout as number))
      scrollDirection=event.deltaY>0
      if ((isAtBottom && event.deltaY > 0) || (isAtTop && event.deltaY < 0)) {
        performScrollAction(300);
        // console.log("end")
      }
      eventDisabled(event)
    }, {passive: false});
    window.addEventListener('keydown', (event) => {
      if ((isAtBottom && (event.key === 'ArrowDown' || event.key === 'PageDown')) || (isAtTop && (event.key === 'ArrowUp' || event.key === 'PageUp'))) {
        performScrollAction(500);
      }
    });
    window.addEventListener('touchstart', handleTouchStart, false);
    window.addEventListener('touchmove', handleTouchMove, false);
    window.addEventListener('touchend', e=> isScrolling=false)

    // Очистка эффектов при размонтировании
    return () => {
      window.removeEventListener('scroll', checkIfAtEnd);
      window.removeEventListener('wheel', performScrollAction);
      window.removeEventListener('keydown', performScrollAction);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isAtBottom, isAtTop]);

  // Проверка начального состояния при загрузке компонента
  useEffect(() => {
    checkIfAtEnd();
  }, []);

  // useEffect(() => {
  //   if (isAnimationPlay) return
  //
  //   const items=Array.from((scrollerContainerRef.current as HTMLDivElement).children)
  //   const activeItem= items.find(item=> (item as HTMLDivElement).dataset.name==window.location.hash.slice(1))
  //   const menuSection= items.find(item=> (item as HTMLDivElement).dataset.name=="menu")
  //   console.log('isA '+isAnimationPlay)
  //   console.log({scrollDirection})
  //   if (activeItem) {
  //     const nextSection = (activeItem as HTMLDivElement).nextElementSibling;
  //     const prevSections = items.slice(0, items.indexOf(activeItem))
  //     const {bottom, top} = (activeItem as HTMLDivElement).getBoundingClientRect();
  //
  //     prevSections.forEach(item=> (item as HTMLDivElement).style.display="none")

      // if (scrollDirection && prevSection && menuSection) {
      //   (prevSection as HTMLDivElement).style.display = "none";
      //   (menuSection as HTMLDivElement).style.display = "none"
      //   isHiddenSection= true
      //   // console.clear()
      //   console.log("next")
      //   // setTimeout(()=>window.scrollTo({top:0, behavior: "smooth"}), 6)
      // }else if (!scrollDirection && nextSection) {
      //   (nextSection as HTMLDivElement).style.display = "none"
      //   isHiddenSection=true
      //   console.clear()
      //   console.log('prev')
      //   // setTimeout(()=>window.scrollTo({top:0, behavior: "smooth"}), 6)
      // }
  //   }
  // }, [isAnimationPlay]);

  useEffect(() => {
    const handleResize = () => {
      checkIfAtEnd()
      // const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as          HTMLDivElement).dataset.name==window.location.hash.slice(1))
      // if (activeItem){
      //   const {bottom, top}=(activeItem as HTMLDivElement).getBoundingClientRect();
      //   console.log({isHiddenSection})
      //   if (top<=0) {
      //     window.scrollTo({top:0, behavior: "smooth"})
      //     // isHiddenSection=false
      //   }else if (top >=window.innerHeight-4){
      //     setIsAnimationPlay(true);
      //     window.scrollBy({
      //       top: top,
      //       behavior: "smooth"
      //     })
      //     console.log("end")
      //   }
      //   console.log({top, height: window.innerHeight})
      // }
      window.scrollTo(0,2)
    };

    const observer = new ResizeObserver(handleResize);
    if (scrollerRef.current) {
      observer.observe((scrollerRef.current as HTMLDivElement));
    }

    return () => {
      if (scrollerRef.current) {
        observer.unobserve((scrollerRef.current as HTMLDivElement));
      }
    };
  }, []);

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