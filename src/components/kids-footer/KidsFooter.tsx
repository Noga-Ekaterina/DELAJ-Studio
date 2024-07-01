import Link from 'next/link';
import React, { FC } from 'react';
import './kids-footer.scss';
import { circe } from '../../fonts';
import cn from 'classnames';
import Image from 'next/image';

//Images
import footerLogo from '../../../public/images/footer-logo.svg';
import footerPhone from '../../../public/images/footer-phone.png';
import footerGirl from '../../../public/images/footer-girl.png';
import footerCarrot from '../../../public/images/footer-carrot.png';

import LanguageToggle from '../language-toggle/LanguageToggle';

const KidsFooter: FC = () => {
  const className = cn('kids-footer', circe.className);

  return (
    <footer className={className}>
      <div className="footer-item kids-footer__item" id="kids-footer-blue">
        <div className="footer-item__content">
          <a href="#contacts" className='footer-link'>
            Контакты
          </a>
          <ul className='kids-footer__item-list'>
            <li>Head <a href="/">hello@delai.studio</a></li>
            <li>HR <a href="/">@jenechkina1</a></li>
            <li>Work <a href="/">documents@horshield.com</a></li>
          </ul>
          <a href="/">
            <Image className='footer-item__logo' src={footerLogo} alt="" />
          </a>
          <Image className='footer-item__image' src={footerPhone} alt="" />
        </div>
      </div>

      <div className="footer-item kids-footer__item" id="kids-footer-yellow">
        <div className="footer-item__content">
          <a href="#career" className='footer-link'>
            Карьера
          </a>
          <ul>
            <li><a href="/">Animator</a></li>
            <li><a href="/">Art-director</a></li>
            <li><a href="/">3D-Character artist</a></li>
            <li><a href="/">CG Generalist</a></li>
            <li><a href="/">Motion designer</a></li>
            <li><a href="/">Web designer</a></li>
          </ul>
          <LanguageToggle className='footer-language'/>
        </div>
      </div>

      <div className="footer-item kids-footer__item" id="kids-footer-red">
        <div className="footer-item__content">
          <p className='footer-link'>
            заходите <br /> в <span>гости</span>
          </p>
          <div className="footer-socials">
            <a href='/'>Be</a>
            <a href='/'>Vk</a>
            <a href='/'>Tg</a>
          </div>
          <Image src={footerGirl} alt="" />
        </div>
      </div>

      <div className="footer-item kids-footer__item" id="kids-footer-purple">
        <div className="footer-item__content">
          <a href="#about" className='footer-link'>
            О нас
          </a>
          <Image src={footerCarrot} alt=""/>
        </div>
      </div>

    </footer>
  );
};

export default KidsFooter;