import React from 'react';
import '../menu.scss';
import './ideas.scss';
import { halvar } from '@/fonts';
import Link from 'next/link';
import ExamplesSlider from '@/components/examples-slider/ExamplesSlider';
import cn from 'classnames';

const page = () => {
  return (
    <div className="menu-inner ideas">
      <div className="menu-section ideas-content">

        <h1 className='menu-link'>Идеи</h1>

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

      <div className="menu-underline">
        <div className="menu-underline__item main-blue"></div>
        <div className="menu-underline__item yellow"></div>
        <div className="menu-underline__item red"></div>
        <div className="menu-underline__item purple"></div>
      </div>
    </div>
  );
};

export default page;