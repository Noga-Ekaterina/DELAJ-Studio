'use client'
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { circe } from '@/fonts';

//Images
import logo from '../../../../public/Assets/Slides/Animations/Images/Adults/footer-logo.svg';
import LanguageToggle from '../../language-toggle/LanguageToggle';

import './basic-footer.scss';
import {useLocale} from "@/components/_hooks/useLocale";
import general from "@/store/text/general";
import FooterSocial from "@/components/_footers/footer-social/FooterSocial";
import {observer} from "mobx-react-lite";

const BasicFooter = () => {
  const locale=useLocale()
  const {footers}=general

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
          <FooterSocial type="project"/>
          <span>{footers && footers.adult.rights[locale]}</span>
        </div>
      </div>
    </footer>
  );
};

export default observer(BasicFooter);