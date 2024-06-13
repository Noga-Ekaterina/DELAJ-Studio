import React from 'react';
import '../../app/menu/menu.scss';
import './menu-footer.scss';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/logo.svg'
import LanguageToggle from '../language-toggle/LanguageToggle';
import cn from 'classnames' ;
import { circe } from '@/fonts';

const MenuFooter = () => {
  return (
    <footer className={cn('menu-footer', circe.className)}>
      <Link href="/">
        <Image className='footer-item__logo' src={logo} alt="" />
      </Link>

      <LanguageToggle className='footer-language'/>

      <div className="footer-socials">
        <Link href='/'>Be</Link>
        <Link href='/'>Vk</Link>
        <Link href='/'>Tg</Link>
      </div>

      <p>All rights reserved</p>
    </footer>
  );
};

export default MenuFooter;