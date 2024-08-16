import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { circe } from '@/fonts';

//Images
import logo from '../../../public/Assets/Slides/Animations/Images/Adults/footer-logo.svg';
import LanguageToggle from '../language-toggle/LanguageToggle';

import './basic-footer.scss';

const BasicFooter = () => {
  return (
    <footer className={classNames('footer basic-footer', circe.className)}>
      <div className="basic-footer__section">
        <div className="basic-footer__section basic-footer__section-left">
          <Link href="/">
            <Image className='footer-item__logo' src={logo} alt=""/>
          </Link>
          <LanguageToggle className='footer-language' />
        </div>
        <div className="basic-footer__section basic-footer__section-right">
          <div className="footer-socials">
            <a href='/'>Be</a>
            <a href='/'>Vk</a>
            <a href='/'>Tg</a>
          </div>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default BasicFooter;