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
          <Link href="/menu/contacts" className='footer-link'>
            Контакты
          </Link>
          <ul className='kids-footer__item-list'>
            <li>Head <Link href="/">hello@delai.studio</Link></li>
            <li>HR <Link href="/">@jenechkina1</Link></li>
            <li>Work <Link href="/">documents@horshield.com</Link></li>
          </ul>
          <Link href="/">
            <Image className='footer-item__logo' src={footerLogo} alt="" />
          </Link>
          <Image className='footer-item__image' src={footerPhone} alt="" />
        </div>
      </div>

      <div className="footer-item kids-footer__item" id="kids-footer-yellow">
        <div className="footer-item__content">
          <Link href="/menu/career" className='footer-link'>
            Карьера
          </Link>
          <ul>
            <li><Link href="/">Animator</Link></li>
            <li><Link href="/">Art-director</Link></li>
            <li><Link href="/">3D-Character artist</Link></li>
            <li><Link href="/">CG Generalist</Link></li>
            <li><Link href="/">Motion designer</Link></li>
            <li><Link href="/">Web designer</Link></li>
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
            <Link href='/'>Be</Link>
            <Link href='/'>Vk</Link>
            <Link href='/'>Tg</Link>
          </div>
          <Image src={footerGirl} alt="" />
        </div>
      </div>

      <div className="footer-item kids-footer__item" id="kids-footer-purple">
        <div className="footer-item__content">
          <Link href="/" className='footer-link'>
            О нас
          </Link>
          <Image src={footerCarrot} alt=""/>
        </div>
      </div>

    </footer>
  );
};

export default KidsFooter;