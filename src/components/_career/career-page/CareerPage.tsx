'use client'
import React from 'react';
import "./career-page.scss"
import {observer} from "mobx-react-lite";
import cn from "classnames";
import {circe} from "@/fonts";
import BreadCrumbs from "@/components/bread-crumbs/BreadCrumbs";
import Image from "next/image";
import close from "../../../../public/images/close.svg";
import CareerOption from "@/components/_career/career-option/CareerOptions";
import CareerSlider from "@/components/_career/career-slder/CareerSlider";
import CareerItemForm from "@/components/_career/career-form/CareerForm";
import {useLocale} from "@/components/_hooks/useLocale";
import career from "@/store/text/career";
import {useRouter} from "next/navigation";
import store from "@/store/store";
import CloseButtons from "@/components/close-modal-button/CloseButtons";
import Link from "next/link";
import Outline from "@/components/outline/Outline";
import {ICareer} from "@/typesData";

interface Props {
  id: number
  careerList?: ICareer[]|null
}
const CareerPage = ({id, careerList}: Props) => {
  const {isShowContent}=store
  const locale=useLocale()
  const router=useRouter()
  const careerItem=careerList &&careerList.find(item=> item.id==id)

  if (!careerItem) return <div/>
  
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
                {text: careerItem.data.title[locale]}
              ]}
          />
        </CloseButtons>

        <div className={cn('career-page__wrap')}>
          <div className="career-page__content">
            <h2>{careerItem.data.title[locale]}</h2>
            <div className="career-page__options">
              {careerItem.data.options[locale].map((option, index) => (
                  <CareerOption type={option} key={'career-page-option' + index}/>
              ))}
              <CareerOption type={careerItem.data.isOpened ? "opened" : "closed"}/>
            </div>

            <div className="career-page__body">
              <CareerSlider career={careerItem} vacancies={careerList}/>
              <CareerItemForm vacancy={careerItem.data.title.ru}/>
            </div>
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

export default observer(CareerPage);
