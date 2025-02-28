'use client';
import React, { useEffect, useState } from 'react';
import './career.scss';
import { circe } from '@/fonts';
import cn from 'classnames';
import { useHash } from '@/components/_hooks/useHash';
import {ICareer, IMenuSectionTitle} from '@/typesData';
import BreadCrumbs from '@/components/bread-crumbs/BreadCrumbs';
import CareerSlider from '../../_career/career-slder/CareerSlider';
import CareerItemForm from '../../_career/career-form/CareerForm';
import close from '../../../../public/images/close.svg';
import Image from 'next/image';
import CareerOption from '@/components/_career/career-option/CareerOptions';
import {useLocale} from "@/components/_hooks/useLocale";
import general from "@/store/text/general";
import {observer} from "mobx-react-lite";
import Link from "next/link";
import career from "@/store/text/career";
import Outline from "@/components/outline/Outline";

interface Props{
  careerList?: ICareer[]|null
  menuSectionTitle?: IMenuSectionTitle|null
}

const Career = ({careerList, menuSectionTitle}:Props) => {
  const locale=useLocale()

  return (
      <div className={cn('menu-inner career', circe.className)}>
        <div className="menu-section">
          <h1 className='menu-link'>{menuSectionTitle && menuSectionTitle.career[locale]}</h1>
          <div className="career-list">
            {careerList && (
                careerList.map((item, index) => (
                    <Link href={`career/${item.id}`} className="career-item" key={'career-item' + index}>
                      <h3>{item.data.title[locale]}</h3>
                      <p>{item.data.description[locale]}</p>
                      <div className="career-item__options">
                        {item.data.options[locale].map((option, index) => (
                            <CareerOption type={option} key={'career-list-option' + index} />
                        ))}
                        <CareerOption type={item.data.isOpened? "opened":"closed"}/>
                      </div>
                    </Link>
                ))
            )}
          </div>
        </div>
        <Outline/>
      </div>
  );
};

export default observer(Career);