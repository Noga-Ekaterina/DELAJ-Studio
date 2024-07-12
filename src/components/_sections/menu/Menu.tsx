import { FC } from 'react';
import './menu.scss';
import Image from 'next/image';
import Link from 'next/link';
import { halvar, circe } from '@/fonts';
import './menu-home.scss';

//Images
import LanguageToggle from '@/components/language-toggle/LanguageToggle';
import bg from '../../../../public/images/modals/menu-bg.png';
import bgTablet from '../../../../public/images/modals/menu-bg-tablet.png';
import bgMobile from '../../../../public/images/modals/menu-bg-mobile.png';

import cn from 'classnames';

const Menu: FC = () => {
  return (
      <div className={cn('menu menu-home', circe.className)}>
        <div className="menu-home__links">
          <a href="#about" className="menu-link" id="menu-about">
            о нас
          </a>
          <a href="#career" className="menu-link" id="menu-career">
            карьера
          </a>
          <a href="#contacts" className="menu-link" id="menu-contact">
            контакты
          </a>
          <a href="#faq" className="menu-link" id="menu-faq" style={{left: '10%'}}>
            faq
          </a>
          <a href="#ideas" className="menu-link" id="menu-ideas" style={{left: '-7%'}}>
            идеи
          </a>
          <LanguageToggle className={cn('menu-home__language', halvar.className)}/>
        </div>

        <Image className='menu-home__bg' src={bg} alt="" width={1000}/>
        <Image className='menu-home__bg menu-home__bg-tablet' width={1000} src={bgTablet} alt="" />
        <Image className='menu-home__bg menu-home__bg-mobile' width={1000} src={bgMobile} alt="" />
      </div>
  );
};

export default Menu;