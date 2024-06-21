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
            <Link href="/menu/contacts" className='footer-link'>Contact us</Link>
            <ul>
              <li>Head <Link href="/">hello@delai.studio</Link></li>
              <li>HR <Link href="/">@jenechkina1</Link></li>
              <li>Work <Link href="/">documents@horshield.com</Link></li>
            </ul>
            <Link href='/'>
              <Image src={logo} className='footer-item__logo' alt=""/>
            </Link>
          </div>
        </div>

        <div className="footer-item adult-footer__item" id="adult-footer-yellow">
          <div className="footer-item__content">
            <Link href="/menu/career" className='footer-link'>career</Link>
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

        <div className="footer-item adult-footer__item" id="adult-footer-purple">
          <div className="footer-item__content">
            <Link href="/menu/about" className='footer-link'>about us</Link>
            <div className="adult-footer__item-row">
              <div className="footer-socials">
                <Link href='/'>Be</Link>
                <Link href='/'>Vk</Link>
                <Link href='/'>Tg</Link>
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