'use client';
import React, { useEffect, useState } from 'react';
import './career.scss';
import { circe } from '@/fonts';
import cn from 'classnames';
import { useHash } from '@/components/_hooks/useHash';
import { ICareer } from '@/types';
import BreadCrumbs from '@/components/bread-crumbs/BreadCrumbs';
import CareerSlider from './CareerSlider';
import CareerItemForm from './CareerForm';
import close from '../../../../public/images/close.svg';
import Image from 'next/image';
import CareerOption from '@/components/career-option/CareerOptions';
import {useLocale} from "@/components/_hooks/useLocale";
import menuSections from "@/store/text/menuSecton";
import {observer} from "mobx-react-lite";

const getData = async () => {
  const response = await fetch('/api/career');
  const data = await response.json();
  return data;
}

const Career = () => {
  const locale=useLocale()
  const {menuSectionTitle}=menuSections
  const hash = useHash();  
  const [career, setCareer] = useState<ICareer | null>(null);
  const [data, setData] = useState<ICareer[]>([]);
  function getSearchParams(key: string) {
    const paramsStart = hash?.indexOf('?')
    if (paramsStart) {
      const params = new URLSearchParams(hash?.slice(paramsStart));
      return params.get(key);
    } 
    return '';
  }

  function getCareer(id: string | null) {
    if (id) {
      return data.find(item => item.id === id) || null;
    }
    return null;
  }

  useEffect(() => {
    if (data.length <= 0) {
      getData()
        .then((data) => {
          setData(data);
        })
        .catch(() => console.log('no vacancies'))
    } 
    const id = getSearchParams('id');
    setCareer(getCareer(id));

  }, [hash, data]);

  return (
    <>
      { (!career) ? (
          <div  className={cn('menu-inner career', circe.className)}>
            <div className="menu-section">
              <h1 className='menu-link'>{menuSectionTitle&& menuSectionTitle.career[locale]}</h1>
              <div className="career-list">
                {data.map((item, index) => (
                  <a href={`#career?id=${item.id}`} className="career-item" key={'career-item' + index}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="career-item__options">
                      {item.options.map((option, index) => (
                        <CareerOption type={option} key={'career-list-option' + index} />
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={cn('career-page', circe.className)}>
            <BreadCrumbs 
                links={[
                  {text: 'вакансии', onClick: () => setCareer(null)},
                  {text: career.title}
                ]}
              />

              <button className="career-page__close" onClick={() => setCareer(null)}> 
                <Image src={close} alt="" />
              </button>

              <h2>{career.title}</h2>
              <div className="career-page__options">
              {career.options.map((option, index) => (
                <CareerOption type={option} key={'career-page-option' + index}/>
              ))}
              </div>

              <div className="career-page__body">
                <CareerSlider career={career} vacancies={data} />
                <CareerItemForm />
              </div>
          </div>
        )
      }
    </>
  );
};

export default observer(Career);