import React, { FC } from 'react';
import cn from 'classnames';
import { circe } from '@/fonts';
import './adult-footer.scss';
import Link from 'next/link';
import LanguageToggle from '../language-toggle/LanguageToggle';
import Image from 'next/image';

//Images
import logo from '../../../public/images/logo.svg'
import footerMan from '../../../public/images/adult/footer-man.svg'

const AdultFooter: FC = () => {
  const className = cn('adult-footer', circe.className)

  return (
    <footer className={className}>
      <div className="adult-footer__content">
        <div className="footer-item adult-footer__item" id="adult-footer-blue">
          <div className="footer-item__content">
            <a href="#contacts" className='footer-link'>Contact us</a>
            <ul>
              <li>Head <a href="/">hello@delai.studio</a></li>
              <li>HR <a href="/">@jenechkina1</a></li>
              <li>Work <a href="/">documents@horshield.com</a></li>
            </ul>
            <a href='/'>
              <Image src={logo} className='footer-item__logo' alt=""/>
            </a>
          </div>
        </div>

        <div className="footer-item adult-footer__item" id="adult-footer-yellow">
          <div className="footer-item__content">
            <a href="#career" className='footer-link'>career</a>
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

        <div className="footer-item adult-footer__item" id="adult-footer-purple">
          <div className="footer-item__content">
            <a href="#about" className='footer-link'>about us</a>
            <div className="adult-footer__item-row">
              <div className="footer-socials">
                <a href='/'>Be</a>
                <a href='/'>Vk</a>
                <a href='/'>Tg</a>
              </div>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </div>

      <div className='adult-footer__man'>
        <Image src={footerMan} alt="" />
      </div>

      <div className="adult-footer__underlines">
        <div className="main-blue"></div>
        <div className="yellow"></div>
        <div className="red"></div>
        <div className="purple"></div>
      </div>
    </footer>
  );
};

export default AdultFooter;