import { FC, useEffect, useRef, useState } from "react";

import "./career.scss";
import './career-slider.scss';
import { ICareer, IWithClass } from "@/types";
import Image from "next/image";
import arrow from '../../../../public/images/arrow.svg';
import { useViewport } from "@/components/_hooks/useViewport";
import classNames from "classnames";

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

  const changeCareer = (param: ChangeIdParam) => {
    const index = vacancies.indexOf(career);
    if (param === 'prev') {
      const prevIndex = index - 1;
      setNewCareerIndex(prevIndex);
    } else {
      const prevIndex = index + 1;
      setNewCareerIndex(prevIndex);
    }
  }

  useEffect(() => {
    if (window && newCareerIndex > -1) {
      const newId = vacancies.find((item, index) => index === newCareerIndex)
      if (newId) {
        window.location.hash = `#career?id=${newId.id}`;
      }
    }
  },[newCareerIndex]);

  useEffect(() => {
    if (document) {
      const currentDuties = document.getElementById('career-' + id);
      if (currentDuties && ref.current) {
        const offset = currentDuties.offsetLeft;
        ref.current.style.transform = `translateX(-${offset}px)`;
      }
    }
  }, [id, viewport])

  return (
    <>
      <div className={("career-slider")}>
        <div className="career-slider__wrapper" ref={ref}>
          {vacancies.map(item => {
            return(
            <div className="career-slider__item" id={'career-' + item.id}>
              {item.duties?.map((duty, index) => (
                <div className="career-slider__item-row"  key={'career-' + index}>
                  <h3>{duty.title}</h3>
                  <ul>
                    {duty.list.map((li, liIndex) => <li key={`career-${index}-${liIndex}`}>{li}</li>)}
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
        <a className='career-slider__more' href="#career">еще вакансии</a>
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