'use client'
import React from 'react';
import '../menu/menu.scss' ;
import './about.scss';
import menuSections from "@/store/text/menuSecton";
import {observer} from "mobx-react-lite";

// Images
import aboutHero from '../../../../public/images/modals/about-hero-image.png';
import aboutHeroSketch from '../../../../public/images/modals/about-hero-image-2.png';
import aboutSketch from '../../../../public/images/modals/about-sketch.png';

import Image from 'next/image';
import { halvar, circe } from '@/fonts';
import cn from 'classnames';

import sponsor1 from '../../../../public/images/modals/sponsor-1.png'
import sponsor2 from '../../../../public/images/modals/sponsor-2.png'
import sponsor3 from '../../../../public/images/modals/sponsor-3.png'
import sponsor4 from '../../../../public/images/modals/sponsor-4.png'
import sponsor5 from '../../../../public/images/modals/sponsor-5.png'
import sponsor6 from '../../../../public/images/modals/sponsor-6.png'
import sponsor7 from '../../../../public/images/modals/sponsor-7.png'
import sponsor8 from '../../../../public/images/modals/sponsor-8.png'
import sponsor9 from '../../../../public/images/modals/sponsor-9.png'
import sponsor10 from '../../../../public/images/modals/sponsor-10.png'
import sponsor11 from '../../../../public/images/modals/sponsor-11.png'
import sponsor12 from '../../../../public/images/modals/sponsor-12.png'
import sponsor13 from '../../../../public/images/modals/sponsor-13.png'
import sponsor14 from '../../../../public/images/modals/sponsor-14.png'
import sponsor15 from '../../../../public/images/modals/sponsor-15.png'
import sponsor16 from '../../../../public/images/modals/sponsor-16.png'
import sponsor17 from '../../../../public/images/modals/sponsor-17.png'
import sponsor18 from '../../../../public/images/modals/sponsor-18.png'
import sponsor29 from '../../../../public/images/modals/sponsor-19.png'
import sponsor20 from '../../../../public/images/modals/sponsor-20.png'
import sponsor21 from '../../../../public/images/modals/sponsor-21.png'
import sponsor22 from '../../../../public/images/modals/sponsor-22.png'
import sponsor23 from '../../../../public/images/modals/sponsor-23.png'
import sponsor24 from '../../../../public/images/modals/sponsor-24.png'
import Showreel from '@/components/showreel/Showreel';
import {useLocale} from "@/components/_hooks/useLocale";

const sponsors = [
sponsor1,sponsor2,sponsor3,sponsor4,sponsor5,sponsor6,sponsor7,sponsor8,sponsor9,sponsor10,sponsor11,sponsor12,sponsor13,sponsor14,sponsor15,sponsor16,sponsor17,sponsor18,sponsor29,sponsor20,sponsor21,sponsor22,sponsor23,sponsor24
]

const About = () => {
  const locale=useLocale()
  const {menuSectionTitle}=menuSections
  return (
    <div className={cn("menu", circe.className)}>
      <div className={'menu-inner about'}>
        <div className="about-top">

          <section className='menu-section'>
            <h1 className={('menu-link')}>{menuSectionTitle&&menuSectionTitle.about[locale]}</h1>
          </section>

          <section className='about-hero'>
              
              <Image className="about-hero__picture" src={aboutHero} alt="" />
            
              <div className='about-hero__paragraph'>
                <p>Студия образовалась в 2017 году командой профессионалов из CG индустрии и анимации. За нашими плечами участие в больших международных и российских проектах. </p>
                <p> Мы сотрудничаем с крупными брендами, агентствами и киностудиями.</p>
              </div>
              
              <div className="about-text">
                <h2 className={halvar.className}>Что мы <br/>делаем?</h2>
                <p>Мы хотим вам показать подробный процесс работы над анимационным роликом в технике 2D рисованной анимации и аниме. Здесь собраны самые мельчайшие нюансы, дабы продемонстрировать, какие этапы и подэтапы пройдет проект прежде чем обрести свои финальные черты.</p>
              </div>
              <Image className='about-hero__sketch' src={aboutHeroSketch} alt="" />
          </section>

          <section className='about-animation'>
            <div className='about-animation__item'>2D-анимация</div>
            <div className='about-animation__item'>3D-анимация</div>
          </section>

          <section className='menu-section about-branches'>
            <h2>направления работы</h2>
            <ul>
              <li>рекламные ролики</li>
              <li>имиджевые ролики</li>
              <li>промо-ролики</li>
              <li>анимационные сериалы</li>
              <li>полный метр</li>
              <li>короткий метр</li>
              <li>book-трейлеры</li>
              <li>музыкальные клипы</li>
            </ul>
          </section>

          <div className="about-top__side-lines">
            <div className="line main-blue"></div>
            <div className="line yellow"></div>
            <div className="line red"></div>
          </div>
        </div>

        {/* <Image className='about-image' src={bigImage} alt=""/> */}
        <Showreel video={"about"} />

        <section className="menu-section about-technologies">
          <div className="about-technologies__item">VFX</div>
          <div className="about-technologies__item">моушн-дизайн</div>
          <div className="about-technologies__item">инфографика</div>
          <div className="about-technologies__item">звукорежиссура</div>
        </section>

        
        <div className="container">
          <section className='about-work'>
            <Image className='about-work__sketch' src={aboutSketch} alt=""/>
            <div className="about-text">
              <h2 className={halvar.className}>как мы <br/>работаем?</h2>
              <p>Мы хотим вам показать подробный процесс работы над анимационным роликом в технике 2D рисованной анимации и аниме. Здесь собраны самые мельчайшие нюансы, дабы продемонстрировать, какие этапы и подэтапы пройдет проект прежде чем обрести свои финальные черты.</p>
            </div>
          </section>
        </div>

        <div className="container">
          <section className='about-steps'>
            <div className="about-steps__item">
              <h2>этап <br />пре-продакшен</h2>
              <ul>
                <li>Сценарий </li>
                <li>Сториборд </li>
                <li>Колор-скрипт </li>
                <li>Аниматик </li>
                <li>Концепт Арт </li>
              </ul>
            </div>
            <div className="about-steps__item">
              <h2>этап II <br />продакшен</h2>
              <ul>
                <li>Иллюстрации фонов </li>
                <li>Иллюстрации персонажей </li>
                <li>Анимация</li>
                <li>Композитинг</li>
              </ul>
            </div>
            <div className="about-steps__item">
              <h2>этап III <br />пост-продакшен</h2>
              <ul>
                <li>Музыка</li>
                <li>Звукорежиссура</li>
                <li>Цветокоррекция</li>
                <li>Монтаж</li>
              </ul>
            </div>
          </section>
        </div>

        <section className="about-sponsors">
          <div className="menu-section">
            <h2 className={halvar.className}>наши <br />клиенты</h2>
            <div className="about-sponsors__list">
              {sponsors.map((item, index) => (
                <div className='about-sponsors__list-item' key={'sponsor' + index}>
                  <Image src={item} alt="" />
                </div>
              ))}
            </div>
          </div>
        </section> 
      </div>
    </div>
  );
};

export default observer(About);