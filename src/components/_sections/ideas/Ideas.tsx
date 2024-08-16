'use client'
import React from 'react';
import '../menu/menu.scss';
import './ideas.scss';
import { halvar, circe } from '@/fonts';
import Link from 'next/link';
import ExamplesSlider from '@/components/examples-slider/ExamplesSlider';
import cn from 'classnames';
import menuSections from "@/store/text/menuSecton";
import {useLocale} from "@/components/_hooks/useLocale";
import {observer} from "mobx-react-lite";

const Ideas = () => {
  const locale=useLocale()
  const {menuSectionTitle}=menuSections
  return (
    <div className={cn("menu-inner ideas", circe.className)}>
      <div className="menu-section ideas-content">
        <h1 className='menu-link'>{menuSectionTitle&& menuSectionTitle.ideas[locale]}</h1>

        <h2 className={cn('menu-calling', halvar.className)}>мы всегда <br/>в поиске идей!</h2>

        <div className="ideas-mail menu-mail">
          <Link href="/">invest@delai.studio </Link>
          <p>Если у вас есть крутая идея для мультфильма и вы хотите ее реализовать — пишите нам на почту</p>
        </div>

        <div className="ideas-bottom">
          <div className="ideas-conditions">
            <p className="ideas-conditions__title">Условия подачи</p>
            <ol>
              <li>Быть старше 18 лет </li>
              <li>Желательно иметь профильное образование в области кино, художественных искусств или иметь опыт работы в киносфере, но готовы рассмотреть и заявки от студентов последних курсов профильных вузов </li>
              <li>Заявка должна содержать (презентацию с общим описанием проекта, сценарий, синопсис) </li>
            </ol>
          </div>

          <ExamplesSlider className='ideas-slider'/>
        </div>
      </div>
    </div>
  );
};

export default observer(Ideas);