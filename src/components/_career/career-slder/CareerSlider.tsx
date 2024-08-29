'use client'
import { FC, useEffect, useRef, useState } from "react";

import "../../_sections/career/career.scss";
import './career-slider.scss';
import {IWithClass} from "@/types";
import {ICareer, ICareerDuties} from "@/typesData";
import Image from "next/image";
import arrow from '../../../../public/images/arrow.svg';
import { useViewport } from "@/components/_hooks/useViewport";
import classNames from "classnames";
import {useLocale} from "@/components/_hooks/useLocale";
import {usePathname, useRouter} from "next/navigation";

type ChangeIdParam = 'prev' | 'next'

interface Props extends IWithClass{
  career: ICareer
  vacancies: ICareer[]
}

const CareerSlider: FC<Props> = ({ career, vacancies }) => {
  const id = career.id;
  const ref = useRef<HTMLDivElement | null>(null);
  const viewport = useViewport();
  const [newCareerIndex, setNewCareerIndex] =  useState(-1);
  const locale=useLocale()
  const router=useRouter()
  const pathname=usePathname()

  const changeCareer = (param: ChangeIdParam) => {
    const index = vacancies.indexOf(career);
    if (param === 'prev') {
      const prevIndex = index - 1;
      setNewCareerIndex(prevIndex);

      router.push(pathname.replace(String(id), String(id==1? vacancies.length: id-1)))
    } else {
      const prevIndex = index + 1;
      setNewCareerIndex(prevIndex);

      router.push(pathname.replace(String(id), id==vacancies.length? "1": String(id+1)))
    }
  }

  useEffect(() => {
    if (window && newCareerIndex > -1) {
      const newId = vacancies.find((item, index) => index === newCareerIndex)
      if (newId) {
        // router.push(pathname.replace(id, newId.id))
      }
    }
  },[newCareerIndex]);

  useEffect(() => {
    if (document) {
      const currentDuties = document.getElementById('career-' + id);
      if (currentDuties && ref.current) {
        const offset = 100 * (id - 1);
        (ref.current as HTMLDivElement).style.transform = `translateX(-${offset}%)`;
      }
    }
  }, [id, viewport])

  return (
    <>
      <div className={("career-slider")}>
        <div className="career-slider__wrapper" ref={ref}>
          {vacancies.map(item => {
            return(
            <div className="career-slider__item" id={'career-' + item.id} key={'career-' + item.id}>
              {item.data.duties.map((duty, index) => (
                <div className="career-slider__item-row"  key={'career-' + index}>
                  <h3>{duty.title[locale]}</h3>
                  <ul>
                    {duty.list[locale].map((li, liIndex) => <li key={`career-${index}-${liIndex}`}>{li}</li>)}
                  </ul>
                </div>
              ))}
          </div>)
          })}
        </div>
      </div>
      <div className="career-slider__controls">
        <div className="career-slider__controls-btn controls-prev">
          <button onClick={() => changeCareer('prev')} type="button">
            <Image src={arrow} alt=""/>
          </button>
        </div>
        <div className="career-slider__controls-btn controls-next">
          <button onClick={() => changeCareer('next')} type="button">
            <Image src={arrow} alt=""/>
          </button>
        </div>
      </div>
    </>
  );
};

export default CareerSlider;