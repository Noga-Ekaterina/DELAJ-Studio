'use client'

import React, {useEffect, useRef, useState} from 'react';
import "./logos-slider.scss"
import {clearTimers, observer} from "mobx-react-lite";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import Image from "next/image";
import {SwiperNavigation} from "@/utils/SwiperNavigation";
import arrow from '../../../public/Assets/Icons/arrow.svg';
import {IAbout} from "@/typesData";


interface Props{
  aboutText?: IAbout|null
  }

const LogosSlider = ({aboutText}:Props) => {
  const [slides, setSlides] = useState<JSX.Element[]|null>(null)
  const swiperRef = useRef<SwiperRef>(null);
  const swiperNav= new SwiperNavigation(swiperRef)
  let timeout: ReturnType<typeof setTimeout>
  let interval: ReturnType<typeof setInterval>;

  const togleSwiper=(dir?: "next" | "prev")=>{
    clearTimeout(timeout)
    clearInterval(interval)

    const step=()=>{
      if (dir=="next")
        swiperNav.goToNext()
      else
        swiperNav.goToPrev()
    }

    step()

    interval= setInterval( step, 400)

    setTimeout(()=>{
      clearInterval(interval)
      timeout= setTimeout(()=>togleSwiper("next"), 6000)
    },2000)
  }

  useEffect(() => {
    if (!aboutText) return

    const result: JSX.Element[]=[]
    for (let i=1; i<=aboutText.clients.quantity; i++){
      result.push(
          <SwiperSlide key={i}>
            <img src={`/Assets/Slides/About/Images/Logos/${i}.png`} alt="" loading="lazy"/>
          </SwiperSlide>
      )
    }

    setSlides(result)
  }, [aboutText]);

  useEffect(() => {
    togleSwiper()

    return ()=> {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, []);

  return (
      <>
        {
            slides &&
            <div className="logos-slider">
               <button className="logos-slider__btn logos-slider__btn--prev" onClick={() => togleSwiper("prev")}>
                  <Image src={arrow} alt=''/>
               </button>
               <Swiper
                   slidesPerView={5}
                   loop={true}
                   className="logos-slider__swiper"
                   ref={swiperRef}
               >
                 {
                   slides.map(slide => slide)
                 }
               </Swiper>
               <button className="logos-slider__btn" onClick={() => togleSwiper("next")}>
                  <Image src={arrow} alt=''/>
               </button>
            </div>

        }
      </>
  );
};

export default observer(LogosSlider);
