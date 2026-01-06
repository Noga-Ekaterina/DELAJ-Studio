'use client'
import React from 'react';
import '../menu/menu.scss';
import './contacts.scss';
import '../../../components/_sections/about/about.scss';
import { halvar, circe } from '@/fonts';
import {useLocale} from "@/components/_hooks/useLocale";
import cn from 'classnames';
import Outline from "@/components/outline/Outline";
import {IContacts, IMenuSectionTitle} from "@/typesData";

interface Props{
  contactsText?: IContacts|null
  menuSectionTitle?: IMenuSectionTitle|null
}

const Contacts = ({contactsText, menuSectionTitle}:Props) => {
  const locale=useLocale()

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
                    <img src={`/Assets/Slides/Contacts/Images/Logos/${index+1}.svg`} alt="" loading="lazy"/>
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
            <img src="/Assets/Slides/Contacts/Images/bg.svg" alt="" loading="lazy"/>
          </div>
        </div>  
      </div>
      <Outline/>
    </div>
  );
};

export default Contacts;