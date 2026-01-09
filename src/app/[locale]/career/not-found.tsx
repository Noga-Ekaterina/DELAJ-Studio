'use client'
import React from 'react';
import store from "@/store/store";
import {observer} from "mobx-react-lite";
import {circe, halvar} from "@/fonts";
import BasicFooter from "@/components/_footers/basic-footer/BasicFooter";
import cn from "classnames";
import CloseButtons from "@/components/close-modal-button/CloseButtons";
import BreadCrumbs from "@/components/bread-crumbs/BreadCrumbs";
import Link from "next/link";
import Outline from "@/components/outline/Outline";
import {useLocale} from "@/components/_hooks/useLocale";
import {useRouter} from "next/navigation";

const NotFound = () => {
  const {isShowContent}=store
  const locale=useLocale()
  const router=useRouter()

  const goBack = () => {
    router.back()
  }

  return (
      <div
          className={cn("career-page", circe.className)}
          style={{opacity: isShowContent?1:0}}
      >
        <CloseButtons func={goBack}>
          <BreadCrumbs
              links={[
                {
                  text: locale == "ru" ? 'вакансии' : "vacancy",
                  path: `/${locale != "en" ? locale : ''}#career`
                },
                {text: "404"}
              ]}
          />
        </CloseButtons>

        <div className={cn('career-page__wrap')}>
          <div className="career-page__content">
            <h2>{locale=="ru"? 'Вакансия не найдена' : 'Vacancy not found'}</h2>
          </div>
        </div>
        <Link className='career-page__more' href={`/${locale != "en" ? locale : ""}#career`}>
          {
            locale == "ru" ?
                <>еще вакансии</>
                :
                <>more vacancies</>
          }
        </Link>

        <Outline/>
      </div>

  );
};

export default observer(NotFound);
