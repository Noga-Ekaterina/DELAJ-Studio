import React from 'react';
import '../menu.scss' ;
import './about.scss';

// Images
import aboutHero from '../../../../public/images/modals/about-hero-image.png';
import aboutHeroSketch from '../../../../public/images/modals/about-hero-image-2.png';

import Image from 'next/image';
import { halvar } from '@/fonts';
import cn from 'classnames';

const page = () => {
  return (
    <div className='menu-inner about'>
      <div className="about-top">

        <section className='menu-section'>
          <h1 className={('menu-link')}>О нас</h1>
        </section>

        <section className='about-hero'>
          <div className="about-hero__column">
            <Image src={aboutHero} alt="" />
            <div className="about-text">
              <h2 className={halvar.className}>Что мы <br/>делаем?</h2>
              <p>Мы хотим вам показать подробный процесс работы над анимационным роликом в технике 2D рисованной анимации и аниме. Здесь собраны самые мельчайшие нюансы, дабы продемонстрировать, какие этапы и подэтапы пройдет проект прежде чем обрести свои финальные черты.</p>
            </div>
          </div>
          <div className="about-hero__column">
            <p>Студия образовалась в 2017 году командой профессионалов из CG индустрии и анимации. За нашими плечами участие в больших международных и российских проектах. 
            Мы сотрудничаем с крупными брендами, агентствами и киностудиями.</p>
            <Image src={aboutHeroSketch} alt="" />
          </div>
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
    </div>
  );
};

export default page;