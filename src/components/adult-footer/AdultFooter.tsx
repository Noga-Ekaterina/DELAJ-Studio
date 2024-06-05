import React, { FC } from 'react';
import cn from 'classnames';
import { circe } from '@/fonts';
import './adult-footer.scss';
import Link from 'next/link';
import LanguageToggle from '../language-toggle/LanguageToggle';
import Image from 'next/image';

//Images
import logo from '../../../public/images/logo.svg'
import footerMan from '../../../public/images/adult/footer-man.png'

const AdultFooter: FC = () => {
  const className = cn('adult-footer', circe.className)

  return (
    <footer className={className}>

      <div className="footer-item adult-footer__item" id="adult-footer-blue">
        <Link href="/" className='footer-link'>Contact us</Link>
        <ul>
          <li>Head <Link href="/">hello@delai.studio</Link></li>
          <li>HR <Link href="/">@jenechkina1</Link></li>
          <li>Work <Link href="/">documents@horshield.com</Link></li>
        </ul>
        <Link href='/'>
          <Image src={logo} className='footer-item__logo' alt=""/>
        </Link>
      </div>

      <div className="footer-item adult-footer__item" id="adult-footer-yellow">
        <Link href="/" className='footer-link'>career</Link>
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

      <div className="footer-item adult-footer__item" id="adult-footer-red">
        <Image src={footerMan} className='adult-footer__item-man' alt="" />
      </div>

      <div className="footer-item adult-footer__item" id="adult-footer-purple">
        <Link href="/" className='footer-link'>about us</Link>
        <div className="adult-footer__item-row">
          <div className="footer-socials">
            <Link href='/'>Be</Link>
            <Link href='/'>Vk</Link>
            <Link href='/'>Tg</Link>
          </div>
          <span>All rights reserved</span>
        </div>
      </div>

    </footer>
  );
};

export default AdultFooter;