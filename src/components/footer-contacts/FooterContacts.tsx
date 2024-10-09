import React from 'react';
import {useLocale} from "@/components/_hooks/useLocale";
import homeText from "@/store/text/home";
import menuSections from "@/store/text/menuSecton";
import {IWithClass} from "@/types";
import {observer} from "mobx-react-lite";

interface Props extends IWithClass{
  type: 'kids'|'adult'
}
const FooterContacts = (props:Props) => {
  const locale=useLocale()
  const {landingsText}=homeText
  const {menuSectionTitle}=menuSections

  return (
      <>
        <a href="#contacts" className='footer-link'>{menuSectionTitle && menuSectionTitle.contacts[locale]}</a>
        <ul className={props.className}>
          {
            landingsText && landingsText[props.type].contacts.map(contact=>(
                <li key={`contact-${props.type}-${contact.link.href[locale]}`}>
                  {contact.title[locale]} <a href={contact.link.href[locale]}>{contact.link.text[locale]}</a>
                </li>
              ))
          }
        </ul>
      </>
  );
};

export default observer(FooterContacts);
