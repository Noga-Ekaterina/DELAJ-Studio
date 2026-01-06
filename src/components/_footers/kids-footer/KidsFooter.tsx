'use client'
import React, {FC, useEffect, useState} from 'react';
import './kids-footer.scss';
import { circe } from '../../../fonts';
import cn from 'classnames';
import general from "@/store/text/general";
import {useLocale} from "@/components/_hooks/useLocale";
import {observer} from "mobx-react-lite";

import LanguageToggle from '../../language-toggle/LanguageToggle';
import FooterCareerList from "@/components/_footers/footer-career-list/FooterCareerList";
import FooterContacts from "@/components/_footers/footer-contacts/FooterContacts";
import FooterSocial from "@/components/_footers/footer-social/FooterSocial";

const KidsFooter: FC = () => {
  const className = cn('kids-footer', circe.className);
  const locale=useLocale()
  const {menuSectionTitle, footers}=general
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    if (footers){
      const obj=footers.kids.socialTitle[locale]

      if (typeof obj.highlighted=='string')
      setWords(obj.text.split(obj.highlighted))
    }
  }, [footers, locale]);

  return (
    <footer className={className}>
      <div className="footer-item kids-footer__item" id="kids-footer-blue">
        <div className="footer-item__content">
          <FooterContacts type='kids' className="kids-footer__item-list"/>
          <a href="#">
            <img className='footer-item__logo' src="/Assets/Slides/Animations/Images/Kids/Footer/logo.svg" alt="" loading="lazy" />
          </a>
          <img className='footer-item__image' src="/Assets/Slides/Animations/Images/Kids/Footer/1.png" alt="" loading="lazy" />
        </div>
      </div>

      <div className="footer-item kids-footer__item" id="kids-footer-yellow">
        <div className="footer-item__content">
          <a href="#career" className='footer-link'>
            {menuSectionTitle&& menuSectionTitle.career[locale]}
          </a>
          <FooterCareerList/>
          <LanguageToggle className='footer-language'/>
        </div>
      </div>

      <div className="footer-item kids-footer__item" id="kids-footer-red">
        <div className="footer-item__content">
          <p className='footer-link'>
            {
              words.map((item, index) => {
                if (footers){
                  const obj=footers.kids.socialTitle[locale]

                  if (index === 0 && typeof obj.highlighted==="string") {
                    if (obj.text.indexOf(obj.highlighted)>0){
                      return (
                          <span key={index}>
                            {item}
                            <span className="yellow">{obj.highlighted}</span>
                          </span>
                      )
                    }else {
                      return (
                          <span key={index}>
                            <span className="yellow">{obj.highlighted}</span>
                            {item}
                          </span>
                      )
                    }
                  } else {
                    return <span key={index}>{item}</span>;
                  }
                }
              })
            }
          </p>
          <FooterSocial type="kids"/>
          <img src="/Assets/Slides/Animations/Images/Kids/Footer/2.png" alt="" loading="lazy" />
        </div>
      </div>

      <div className="footer-item kids-footer__item" id="kids-footer-purple">
        <div className="footer-item__content">
          <a href="#about" className='footer-link'>
            {menuSectionTitle&& menuSectionTitle.about[locale]}
          </a>
          <div className="footer-item__row">
            <div className="footer-item__links">
              <a href="#faq" className={circe.className}>{menuSectionTitle && menuSectionTitle.faq[locale]}</a><br/>
              <a
                href="#ideas" className={circe.className}>{menuSectionTitle && menuSectionTitle.ideas[locale]}</a>
            </div>
            <img src="/Assets/Slides/Animations/Images/Kids/Footer/3.png" alt="" loading="lazy"/>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default observer(KidsFooter);