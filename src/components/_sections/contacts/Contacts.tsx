import React from 'react';
import '../menu/menu.scss';
import './contacts.scss';
import '../../../components/_sections/about/about.scss';
import { halvar, circe } from '@/fonts';
import Link from 'next/link';

// Images
import vk from '../../../../public/images/modals/Vk.svg';
import fb from '../../../../public/images/modals/Fb.svg';
import vi from '../../../../public/images/modals/Vi.svg';
import tg from '../../../../public/images/modals/Tg.svg';
import be from '../../../../public/images/modals/be.svg';
import rabbit from '../../../../public/images/modals/contacts-bg.svg';

import Image from 'next/image';
import cn from 'classnames';
import SectionWrap from '@/components/section-wrap/SectionWrap';

const Contacts = () => {
  return (
    <div className={cn("menu", circe.className)}>
      <div className='menu-inner contacts'>
        <div className="menu-section">
          <h1 className='menu-link'>Контакты</h1>
        </div>
        <div className="menu-section contacts-content">
          <h2 className={cn('menu-calling', halvar.className)}>заходите <br />в гости!</h2>
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
            <Link href="mailto:hello@delai.studio">hello@delai.studio</Link>
            <p>По всем вопросам, связанным с разработкой проектов или сотрудничеством, пишите нам на почту </p>
          </div>
          <div className='contacts-bg'>
            <Image src={rabbit} alt=""/>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Contacts;