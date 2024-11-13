import React from 'react';
import {useLocale} from "@/components/_hooks/useLocale";
import homeText from "@/store/text/home";
import general from "@/store/text/general";
import {IWithClass} from "@/types";
import {observer} from "mobx-react-lite";

interface Props extends IWithClass{
  type: 'kids'|'adult'
}
const FooterContacts = (props:Props) => {
  const locale=useLocale()
  const {menuSectionTitle, footers}=general

  return (
      <>
        <a href="#contacts" className='footer-link'>{menuSectionTitle && menuSectionTitle.contacts[locale]}</a>
        <ul className={props.className}>
          {
            footers && footers[props.type].contacts.map(contact=>(
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
