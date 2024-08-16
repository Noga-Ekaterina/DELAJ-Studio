'use client'
import Link from 'next/link';
import React, {FC, useEffect, useState} from 'react';
import './kids-footer.scss';
import { circe } from '../../fonts';
import cn from 'classnames';
import Image from 'next/image';
import homeText from "@/store/text/home";
import menuSections from "@/store/text/menuSecton";
import {useLocale} from "@/components/_hooks/useLocale";
import {observer} from "mobx-react-lite";


//Images
import footerLogo from '../../../public/Assets/Slides/Animations/Images/Kids/footer-logo.svg';
import footerPhone from '../../../public/Assets/Slides/Animations/Images/Kids/footer-phone.png';
import footerGirl from '../../../public/Assets/Slides/Animations/Images/Kids/footer-girl.png';
import footerCarrot from '../../../public/Assets/Slides/Animations/Images/Kids/footer-carrot.png';

import LanguageToggle from '../language-toggle/LanguageToggle';

const KidsFooter: FC = () => {
  const className = cn('kids-footer', circe.className);
  const locale=useLocale()
  const {landingsText}=homeText
  const {menuSectionTitle}=menuSections
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    if (landingsText){
      const obj=landingsText.kids.footerText[locale]
      setWords(obj.text.split(obj.highlighted))
    }
  }, [landingsText, locale]);

  return (
    <footer className={className}>
      <div className="footer-item kids-footer__item" id="kids-footer-blue">
        <div className="footer-item__content">
          <a href="#contacts" className='footer-link'>
            {menuSectionTitle&& menuSectionTitle.contacts[locale]}
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
            {menuSectionTitle&& menuSectionTitle.career[locale]}
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
            {
              words.map((item, index) => {
                if (landingsText){
                  const obj=landingsText.kids.footerText[locale]

                  if (index === 0) {
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
            {menuSectionTitle&& menuSectionTitle.about[locale]}
          </a>
          <div className="footer-item__row">
            <div className="footer-item__links">
              <a href="#faq" className={circe.className}>{menuSectionTitle && menuSectionTitle.faq[locale]}</a><br/>
              <a
                href="#ideas" className={circe.className}>{menuSectionTitle && menuSectionTitle.ideas[locale]}</a>
            </div>
            <Image src={footerCarrot} alt=""/>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default observer(KidsFooter);