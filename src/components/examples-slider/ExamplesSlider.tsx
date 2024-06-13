'use client';
import React, { useRef } from 'react';
import './examples-slider.scss';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import example1 from '../../../public/images/data/adult-data/1.png';
import example2 from '../../../public/images/data/adult-data/2.png';
import example3 from '../../../public/images/data/kids-data/1.png';
import example4 from '../../../public/images/data/kids-data/2.png';
import arrow from '../../../public/images/arrow.svg';
import 'swiper/css';

const ExamplesSlider = () => {
  const ref = useRef<SwiperRef>(null);

  const toNextSlide = () => {
    if (!ref.current) return;
    ref.current.swiper.slideNext();
  }

  return (
    <div className="examples-slider">
      <div className="examples-slider__head">
        <div className="examples-slider__head-title">
          реализованные <br />проекты
        </div>
        <button onClick={toNextSlide}>
          <Image src={arrow} alt=""/>
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={5}
        slidesPerView={3}
        loop={true}
        ref={ref}
      >
        <SwiperSlide>
          <Link href="/">
            <Image src={example1} alt="" />
          </Link>                  
        </SwiperSlide>
        <SwiperSlide>
            <Link href="/">
              <Image src={example2} alt="" />
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link href="/">
              <Image src={example3} alt="" />
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link href="/">
              <Image src={example4} alt="" />
            </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ExamplesSlider;