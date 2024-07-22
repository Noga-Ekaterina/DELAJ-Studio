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
  const getPureHash = () => {
    const paramsIndex = hash.indexOf('?');
    return (paramsIndex > 0) ? hash.slice(0, paramsIndex) : hash.slice(0);
  }

  useEffect(() => {
    if (hash && scrollerContainerRef.current) {
    //   const pureHash = getPureHash();
    //   const section = document.querySelector(`[data-name="${pureHash}"]`);
    //   //@ts-ignore
    //   const offset = section?.offsetTop || 0;
    //   console.log(section)
    //   console.log(offset)
    //   console.log(scrollerContainerRef.current.getBoundingClientRect())
      // setTranslate(offset)
      const start= scrollNumber
      const items = Array.from((scrollerContainerRef.current as HTMLDivElement).children)
      const activeItem= items.find(item=> (item as HTMLDivElement).dataset.name==hash)
      if (activeItem){
        const {bottom, top}=activeItem.getBoundingClientRect()
        console.log(activeItem.getBoundingClientRect().top)
        // setIsAnimationPlay(true);
        window.scrollTo({
          top: scrollDirection? start+top: start -window.innerHeight + bottom,
          // behavior: "smooth"
        })
      }
   }
    },[hash, viewport, scrollerContainerRef.current ?(scrollerContainerRef.current as HTMLDivElement).clientHeight :0]);

    useEffect(() => {
      // if (document.documentElement.scrollTop || document.body.scrollTop==0)
      //   setIsAnimationPlay(false)

    const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as HTMLDivElement).dataset.name==hash)
    if (isAnimationPlay && activeItem){
      const {bottom, top}=activeItem.getBoundingClientRect()

      if (scrollDirection && top<1){
        setIsAnimationPlay(false)
        console.log("top anim end")
        console.log({item: (activeItem as HTMLDivElement).dataset.name, bottom, top})
      }else if (!scrollDirection && window.innerHeight - bottom<6){
        setIsAnimationPlay(false)
        console.log("botton anim end ")
        console.log({item: (activeItem as HTMLDivElement).dataset.name, bottom, top})
      }
      console.log({item: (activeItem as HTMLDivElement).dataset.name, bottom, top})

    }


  }, [scrollNumber]);

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
      window.scrollTo(0,0)
  }, [hash]);

  useEffect(() => {
    window.addEventListener("scroll", (e: Event) => {
      // console.log(scrollerRef.current.getBoundingClientRect())

      const activeItem= Array.from((scrollerContainerRef.current as HTMLDivElement).children).find(item=> (item as HTMLDivElement).dataset.name==hash)
      const scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (activeItem){
        const nextSection = activeItem
            .nextElementSibling;
        const prevSection = activeItem.previousElementSibling;
        const {bottom, top}=activeItem.getBoundingClientRect()
        // console.log(window.innerHeight - bottom)

        if (window.innerHeight - bottom>6 && scroll>scrollNumber){
          if (nextSection){
            window.location.hash= (nextSection as HTMLDivElement).dataset.name ||''
            console.log("next hash")
          }else {
            window.location.hash= "main-screen"
            changeMenuOpened(false)
            console.log("end")
          }
          setScrollDirection(true)
        }else if ( top>0 && scroll< scrollNumber && prevSection) {
          window.location.hash = (prevSection as HTMLDivElement).dataset.name!= "empty-place"? (prevSection as HTMLDivElement).dataset.name ||'': "main-screen"
          setScrollDirection(false)
          console.log("prev hash")
        }
        // console.log({item: (activeItem as HTMLDivElement).dataset.name, bottom, top})
      }
      console.log(isAnimationPlay)
      setScrollNumber(scroll)
    })

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