'use client'
import React from 'react';
import {useLocale} from "@/components/_hooks/useLocale";
import general from "@/store/text/general";
import {IWithClass} from "@/types";
import {observer} from "mobx-react-lite";

interface Props extends IWithClass{
  type: 'kids'|'adult'|"project"
}

const FooterSocial = ({type}: Props) => {
  const locale=useLocale()
  const {footers}=general

  if (!footers) return  <div/>

  return (
      <div className="footer-socials">
        {
          footers[type].social.map((link, index)=>(
              <a key={`footer-social-${index}`} href={link.href[locale]}>{link.title[locale]}</a>
          ))
        }
      </div>
  );
};

export default observer(FooterSocial);