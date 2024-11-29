'use client'
import React from 'react';
import '../menu/menu.scss';
import './contacts.scss';
import '../../../components/_sections/about/about.scss';
import { halvar, circe } from '@/fonts';
import Link from 'next/link';
import general from "@/store/text/general";
import {useLocale} from "@/components/_hooks/useLocale";
import {observer} from "mobx-react-lite";

// Images
import bg from '../../../../public/Assets/Slides/Contacts/Images/bg.svg';

import Image from 'next/image';
import cn from 'classnames';
import Outline from "@/components/outline/Outline";
import home from "@/store/text/home";

const Contacts = () => {
  const locale=useLocale()
  const {menuSectionTitle}=general
  const {contactsText}= home

  if (!contactsText) return <div/>

  return (
    <div className={cn("menu", circe.className)}>
      <div className='menu-inner contacts'>
        <div className="menu-section">
          <h1 className='menu-link'>{menuSectionTitle&& menuSectionTitle.contacts[locale]}</h1>
        </div>
        <div className="menu-section contacts-content">
          <h2 className={cn('menu-calling', halvar.className)}>{contactsText.title[locale]}</h2>
          <div className="contacts-list">
            {
              contactsText.social.map((item, index)=>(
                  <a key={`contacts-list-link-${index}`} className='contacts-list__link' href={item.href[locale]} target="_blank">
                    <img src={`/Assets/Slides/Contacts/Images/Logos/${index+1}.svg`} alt=""/>
                    {item.title[locale]}
                  </a>
              ))
            }
          </div>
          <div className="menu-mail">
            <a href={contactsText.mail.href[locale]}>{contactsText.mail.text[locale]}</a>
            <p>{contactsText.text[locale]}</p>
          </div>
          <div className='contacts-bg'>
            <Image src={bg} alt=""/>
          </div>
        </div>  
      </div>
      <Outline/>
    </div>
  );
};

export default observer(Contacts);