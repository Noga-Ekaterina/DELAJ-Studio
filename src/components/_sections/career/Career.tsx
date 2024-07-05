'use client';
import React, { useEffect, useState } from 'react';
import './career.scss';
import { circe } from '@/fonts';
import cn from 'classnames';
import Link from 'next/link';
import SectionWrap from '../../section/Section';
import { useSearchParams } from 'next/navigation';
import { useHash } from '@/components/_hooks/useHash';
import { match } from 'ts-pattern';
import CareerSlider from '../../career-slider/CareerSlider';
import { ICareer } from '@/types';

export const data = [
  {
    id: '1', 
    title: '2D-Аниматор', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '2', 
    title: 'сценарист', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '3', 
    title: 'Композитинг артист', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '4', 
    title: 'Режиссер анимации', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '5', 
    title: '3D-Аниматор MAYA (персонажный)', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '6', 
    title: 'Композитор', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '7', 
    title: 'Арт-директор', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '8', 
    title: '3D-аниматор', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '9', 
    title: '2D-художник', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '10', 
    title: 'Линейный продюсер', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '11', 
    title: 'Моушн-дизайнер', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '12', 
    title: '2D-Аниматор', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '13', 
    title: 'сценарист', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
  {
    id: '14', 
    title: 'Композитинг артист', 
    description: 'Мы ищем талантливого и опытного  линейного продюсера анимации, который будет ответственен за организацию и координацию процесса производства анимационного контента.', 
  },
]

const Career = () => {
  const hash = useHash();  
  const [career, setCareer] = useState<ICareer | null>(null);

  function getSearchParams(key: string) {
    const paramsStart = hash?.indexOf('?')
    if (paramsStart) {
      const params = new URLSearchParams(hash?.slice(paramsStart));
      return params.get(key);
    } 
    return '';
  }

  function getCareer(id: string) {
    return data.find(item => item.id === id) || null;
  }

  useEffect(() => {
    const id = getSearchParams('id');
    if (id) {
      setCareer(getCareer(id));
    } else {
      setCareer(null);
    }
  }, [hash]);

  return (
    <>
      {
        (!career)
          ? (
            <div  className={cn('menu-inner career', circe.className)}>
              <div className="menu-section">
                <h1 className='menu-link'>Вакансии</h1>
                <div className="career-list">
                  {data.map((item, index) => (
                    <a href={`#career?id=${item.id}`} className="career-item" key={'career-item' + index}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="career-item__options">
                        <div className="options-item options-freelance">Freelance</div>
                        &nbsp; 
                        <div className="options-item options-opened">Открытая</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )
          : (
            <CareerSlider item={career}/>
          )
      }
    </>
  );
};

export default Career;