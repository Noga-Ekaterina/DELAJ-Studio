import Link from 'next/link';
import React, { FC } from 'react';
import './kids-footer.scss';
import { circe } from '../../fonts';
import cn from 'classnames';
import Image from 'next/image';

//Images
import footerLogo from '../../../public/images/footer-logo.svg';
import footerPhone from '../../../public/images/footer-phone.png';
import LanguageToggle from '../language-toggle/LanguageToggle';

const KidsFooter: FC = () => {

  return (
    <footer className='kids-footer'>
      <div className={cn("kids-footer__item", circe.className)} id="footer-blue">
        <Link href="/" className='kids-footer__item-link'>
          Contact us
        </Link>
        <ul>
          <li>Head <Link href="/">hello@delai.studio</Link></li>
          <li>HR <Link href="/">@jenechkina1</Link></li>
          <li>Work <Link href="/">documents@horshield.com</Link></li>
        </ul>
        <Link href="/">
          <Image src={footerLogo} alt="" />
        </Link>
        <Image className='kids-footer__item-image' src={footerPhone} alt="" />
      </div>

      <div className={cn("kids-footer__item", circe.className)} id="footer-yellow">
        <Link href="/" className='kids-footer__item-link'>
          career
        </Link>
        <ul>
          <li><Link href="/">Animator</Link></li>
          <li><Link href="/">Art-director</Link></li>
          <li><Link href="/">3D-Character artist</Link></li>
          <li><Link href="/">CG Generalist</Link></li>
          <li><Link href="/">Motion designer</Link></li>
          <li><Link href="/">Web designer</Link></li>
        </ul>
        <LanguageToggle />
      </div>

      <div className={cn("kids-footer__item", circe.className)} id="footer-red">
        <Link href="/" className='kids-footer__item-link'>
          заходите в <span>гости</span>
        </Link>

        <div className="kids-footer__item-socials">
          <Link href='/'>Be</Link>
          <Link href='/'>Vk</Link>
          <Link href='/'>Tg</Link>
        </div>
      </div>

      <div className={cn("kids-footer__item", circe.className)} id="footer-purple">
        <Link href="/" className='kids-footer__item-link'>
          Contact us
        </Link>
      </div>
    </footer>
  );
};

export default KidsFooter;