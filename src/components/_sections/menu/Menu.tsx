'use client'
import {FC, useEffect, useState} from 'react';
import './menu.scss';
import Image from 'next/image';
import Link from 'next/link';
import { halvar, circe } from '@/fonts';
import './menu-home.scss';
import {useLocale} from "@/components/_hooks/useLocale";
import general from "@/store/text/general";
import {observer} from "mobx-react-lite";

//Images
import LanguageToggle from '@/components/language-toggle/LanguageToggle';
import bg from '../../../../public/Assets/Slides/Menu/Images/bg.png';
import bgTablet from '../../../../public/Assets/Slides/Menu/Images/bg-tablet.png';
import bgMobile from '../../../../public/Assets/Slides/Menu/Images/bg-mobile.png';

import cn from 'classnames';
import Outline from "@/components/outline/Outline";
import {useIsHome} from "@/components/_hooks/useIsHome";

const Menu: FC = () => {
  const locale=useLocale()
  const isHome=useIsHome()
  const {menuSectionTitle}=general
  const [links, setLinks] = useState<any[]>([])

  useEffect(() => {
    if (menuSectionTitle){
      const newArr: any[]=[]
      const keys = Object.keys(menuSectionTitle) as Array<keyof typeof menuSectionTitle>;
      for (let key of keys) {
        newArr.push(
            isHome ?
                <a href={`#${key}`} key={`menu-${key}`} className={cn("menu-link", `menu-link--${locale}`)}
                   id={`menu-${key}`}>{menuSectionTitle[key][locale]}</a>
                :
                <Link href={`/${locale!='en'? locale:""}#${key}`} key={`menu-${key}`} className={cn("menu-link", `menu-link--${locale}`)}
                   id={`menu-${key}`}>{menuSectionTitle[key][locale]}</Link>
        );
      }


      setLinks(newArr)
    }
  }, [menuSectionTitle, locale, isHome]);
  return (
      <div className={cn('menu menu-home', circe.className)}>
        <div className={cn("menu-home__links", `menu-home__links--${locale}`)}>
          {
            links.map(link=>link)
          }
          <LanguageToggle className={cn('menu-home__language', halvar.className)}/>
        </div>

        <Image className='menu-home__bg' src={bg} alt="" width={1000}/>
        <Image className='menu-home__bg menu-home__bg-tablet' width={1000} src={bgTablet} alt="" />
        <Image className='menu-home__bg menu-home__bg-mobile' width={1000} src={bgMobile} alt="" />

        <Outline/>
      </div>
  );
};

export default observer(Menu);