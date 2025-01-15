'use client'
import React from 'react';
import '../menu/menu.scss';
import './ideas.scss';
import { halvar, circe } from '@/fonts';
import Link from 'next/link';
import ExamplesSlider from '@/components/examples-slider/ExamplesSlider';
import cn from 'classnames';
import general from "@/store/text/general";
import {useLocale} from "@/components/_hooks/useLocale";
import {observer} from "mobx-react-lite";
import Outline from "@/components/outline/Outline";
import home from "@/store/text/home";
import {IIdeas, IMenuSectionTitle} from "@/typesData";

interface Props{
  ideasText?: IIdeas|null
  menuSectionTitle?: IMenuSectionTitle|null
}

const Ideas = ({menuSectionTitle, ideasText}:Props) => {
  const locale=useLocale()

  if (!ideasText) return <div></div>

  return (
    <div className={cn("menu-inner ideas", circe.className)}>
      <div className="menu-section ideas-content">
        <h1 className='menu-link'>{menuSectionTitle&& menuSectionTitle.ideas[locale]}</h1>

        <h2 className={cn('menu-calling', halvar.className)}>{ideasText.title[locale]}</h2>

        <div className="ideas-mail menu-mail">
          <a href={ideasText.mail.href[locale]}>{ideasText.mail.text[locale]}</a>
          <p>{ideasText.text[locale]}</p>
        </div>

        <div className="ideas-bottom">
          <div className="ideas-conditions">
            <p className="ideas-conditions__title">{ideasText.conditions.title[locale]}</p>
            <ol>
              {
                ideasText.conditions.list[locale].map((condition, index)=>(
                    <li key={`ideas-conditions-${index}`}>{condition}</li>
                ))
              }
            </ol>
          </div>

          <ExamplesSlider title={ideasText.projectsTitle[locale]} className='ideas-slider'/>
        </div>
      </div>
      <Outline/>
    </div>
  );
};

export default observer(Ideas);