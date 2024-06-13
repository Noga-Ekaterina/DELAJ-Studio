import React from 'react';
import '../menu.scss';
import './contacts.scss';
import '../about/about.scss';
import { halvar } from '@/fonts';
import Link from 'next/link';

// Images
import vk from '../../../../public/images/modals/Vk.svg';
import fb from '../../../../public/images/modals/Fb.svg';
import vi from '../../../../public/images/modals/Vi.svg';
import tg from '../../../../public/images/modals/Tg.svg';
import be from '../../../../public/images/modals/be.svg';
import rabbit from '../../../../public/images/modals/contacts-bg.png';

import Image from 'next/image';

const page = () => {
  return (
    <div className='menu-inner contacts'>
      <div className="menu-section contacts-content">
        <h1 className='menu-link'>Контакты</h1>
        <h2 className={halvar.className}>заходите <br />в гости!</h2>
        <div className="contacts-list">
          <Link className='contacts-list__link' href="/" id="contacts-vk">
            <Image src={vk} alt=""/>
            Вконтакте
          </Link>
          <Link className='contacts-list__link' href="/" id="contacts-tg">
            <Image src={tg} alt=""/>
            Telegram
          </Link>
          <Link className='contacts-list__link' href="/" id="contacts-be">
            <Image src={be} alt=""/>
            Behance
          </Link>
          <Link className='contacts-list__link' href="/" id="contacts-fb">
            <Image src={fb} alt=""/>
            Facebook
          </Link>
          <Link className='contacts-list__link' href="/" id="contacts-vi">
            <Image src={vi} alt=""/>
            Vimeo
          </Link>
        </div>
        <div className="menu-mail">
          <Link href="/">hello@delai.studio</Link>
          <p>По всем вопросам, связанным с разработкой проектов или сотрудничеством, пишите нам на почту </p>
        </div>
        <Image className='contacts-bg' src={rabbit} alt=""/>
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