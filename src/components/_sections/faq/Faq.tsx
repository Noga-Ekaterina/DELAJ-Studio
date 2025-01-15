'use client'
import React from 'react';
import '../menu/menu.scss';
import './faq.scss';
import QuestionItem from '@/components/question-item/QuestionItem';
import cn from 'classnames';
import { circe } from '@/fonts';
import general from "@/store/text/general";
import {useLocale} from "@/components/_hooks/useLocale";
import {observer} from "mobx-react-lite";
import Outline from "@/components/outline/Outline";
import home from "@/store/text/home";
import {IFaq, IMenuSectionTitle} from "@/typesData";

interface Props{
  faqText?: IFaq[]|null
  menuSectionTitle?: IMenuSectionTitle|null
}

const Faq = ({faqText, menuSectionTitle}:Props) => {
  const locale=useLocale()

  return (
    <div className={cn('menu-inner faq', circe.className)}>
      <div className="menu-section">
        <h1 className='menu-link'>{menuSectionTitle&& menuSectionTitle.faq[locale]}</h1>

        <div className="faq-list">
          {faqText?.map((item, index) => (
            <QuestionItem title={item.question[locale]} answer={item.answer[locale]} key={'faq-list' + index}/>
          ))}
        </div>
      </div>
      <Outline/>
    </div>
  );
};

export default observer(Faq);