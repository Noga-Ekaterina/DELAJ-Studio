'use client';
import {FC, useEffect, useRef, useState} from 'react';
import './examples-slider.scss';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import arrow from '../../../public/Assets/Icons/arrow.svg';
import 'swiper/css';
import { IWithClass } from '@/types';
import cn from 'classnames';
import {IProject} from "@/typesData";
import projects from "@/store/text/Projects";
import {getShuffleArray} from "@/utils/getShuffleArray";
import {observer} from "mobx-react-lite";

interface Proos extends IWithClass{
  title: string
}

interface ISlide extends IProject{
  type: "adults" | "kids"
}

const ExamplesSlider: FC<Proos> = ({ className,  title}) => {
  const ref = useRef<SwiperRef | null>(null);
  const {projectsList}=projects
  const [slides, setSlides] = useState<ISlide[]>([])

  const toNextSlide = () => {
    if (!ref.current) return;
    console.log('next')
    console.log(ref.current?.swiper)
    ref.current?.swiper.slideNext();
  }

  useEffect(() => {
    if (!projectsList) return

    const newArr: ISlide[]=[]
    const keys = Object.keys(projectsList) as Array<keyof typeof projectsList>;
    for (let key of keys) {
      (projectsList[key] as IProject[]).forEach(item=>{
        if (item.idea)
          newArr.push({...item, type: key})
      })
    }

    setSlides(getShuffleArray(newArr))
  }, [projectsList]);

  if (!projectsList)return <div></div>

  return (
    <div className={cn(className, "examples-slider")}>
      <div className="examples-slider__head">
        <div className="examples-slider__head-title">
          {title}
        </div>
        <button className='examples-slider__head-button' onClick={toNextSlide}>
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
        {
          slides.map(slide=>(
              <SwiperSlide
                key={`project-ideas-item-${slide.id}`}
              >
                <Link
                    href={`projects/${slide.type}/${slide.id}`}
                >

                  <Image
                      src={`/Assets/Projects/${slide.type[0].toUpperCase() + slide.type.slice(1)}/Project-${slide.id}/preview.png`}
                      width={131}
                      height={63}
                      alt=""
                  />
                </Link>
              </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default observer(ExamplesSlider);