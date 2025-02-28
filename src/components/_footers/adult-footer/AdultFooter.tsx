'use client'
import React, { FC } from 'react';
import cn from 'classnames';
import { circe } from '@/fonts';
import './adult-footer.scss';
import LanguageToggle from '../../language-toggle/LanguageToggle';
import general from "@/store/text/general";
import {useLocale} from "@/components/_hooks/useLocale";
import {observer} from "mobx-react-lite";
import FooterCareerList from "@/components/_footers/footer-career-list/FooterCareerList";
import Outline from "@/components/outline/Outline";
import FooterContacts from "@/components/_footers/footer-contacts/FooterContacts";
import FooterSocial from "@/components/_footers/footer-social/FooterSocial";

const AdultFooter: FC = () => {
  const locale=useLocale()
  const {menuSectionTitle, footers}=general
  const className = cn('adult-footer', circe.className)

  return (
    <footer className={className}>
      <div className="adult-footer__content">
        <div className="footer-item adult-footer__item" id="adult-footer-blue">
          <div className="footer-item__content">
            <FooterContacts type="adult"/>

            <a href='#'>
              <img src="/Assets/Slides/Animations/Images/Adults/Footer/logo.svg" className='footer-item__logo' alt=""/>
            </a>
          </div>
        </div>

        <div className="footer-item adult-footer__item" id="adult-footer-yellow">
          <div className="footer-item__content">
            <a href="#career" className='footer-link'>{ menuSectionTitle&& menuSectionTitle.career[locale]}</a>
            <FooterCareerList/>
            <LanguageToggle className='footer-language'/>
          </div>
        </div>

        <div className="footer-item adult-footer__item" id="adult-footer-purple">
          <div className="footer-item__content">
            <a href="#about" className='footer-link'>{menuSectionTitle&& menuSectionTitle.about[locale]}</a>
            <div className="adult-footer__item-row">
              <FooterSocial type="adult"/>
              <span>{footers && footers.adult.rights[locale]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='adult-footer__man'>
        <img src="/Assets/Slides/Animations/Images/Adults/Footer/1.png" alt="" />
      </div>

      <Outline/>
    </footer>
  );
};

export default observer(AdultFooter);