'use client'
import React, {memo} from 'react';
import '../menu/menu.scss' ;
import './about.scss';
import general from "@/store/text/general";
import {observer} from "mobx-react-lite";
import { halvar, circe } from '@/fonts';
import cn from 'classnames';
import Showreel from '@/components/showreel/Showreel';
import {useLocale} from "@/components/_hooks/useLocale";
import Outline from "@/components/outline/Outline";
import LogosSlider from "@/components/logos-slider/LogosSlider";
import FlashingList from "@/components/flashing-list/FlashingList";
import {IAbout, IMenuSectionTitle} from "@/typesData";

interface Props{
  aboutText?: IAbout|null
  menuSectionTitle?: IMenuSectionTitle|null
}

const About = ({aboutText, menuSectionTitle}: Props) => {
  const locale=useLocale()

  if (!aboutText) return <div></div>

  return (
    <div className={cn("menu", circe.className)}>
      <div className={'menu-inner about'}>
        <div className="about-top">

          <section className='menu-section'>
            <h1 className={('menu-link')}>{menuSectionTitle&&menuSectionTitle.about[locale]}</h1>
          </section>

          <section className='about-hero'>
              
              <img className="about-hero__picture" src="/Assets/Slides/About/Images/1.png" alt="" />
            
              <div className='about-hero__paragraph'>
                <p>{aboutText.text1[locale]}</p>
              </div>
              
              <div className="about-text">
                <h2 className={halvar.className}>{aboutText.whatDo.title[locale]}</h2>
                <p>{aboutText.whatDo.text[locale]}</p>
              </div>
              <img className='about-hero__sketch' src="/Assets/Slides/About/Images/2.png" alt="" />
          </section>

          <section className='about-animation'>
            {
              aboutText.animationStyles[locale].map(animation=> (
                  <div key={`animations-style-${animation}`} className='about-animation__item'>{animation}</div>
              ))
            }
          </section>

          <section className='menu-section about-branches'>
            <h2>{aboutText.a_2D_3D.title[locale]}</h2>
            <FlashingList strings={aboutText.a_2D_3D.list[locale]}/>
          </section>

          <div className="about-top__side-lines">
            <div className="line main-blue"></div>
            <div className="line yellow"></div>
            <div className="line red"></div>
          </div>
        </div>

        {/* <img className='about-image' src={bigImage} alt=""/> */}
        <Showreel video={"about"} />

        <section className="menu-section about-technologies">
          {
            aboutText.specializations[locale].map((specialization, index)=> (
                <div key={`specialization-${index}`} className="about-technologies__item">{specialization}</div>
            ))
          }
        </section>


        <div className="container">
          <section className='about-work'>
            <img className='about-work__sketch' src='/Assets/Slides/About/Images/3.png' alt=""/>
            <div className="about-text">
              <h2 className={halvar.className}>{aboutText.howWork.title[locale]}</h2>
              <p>{aboutText.howWork.text[locale]}</p>
            </div>
          </section>
        </div>

        <div className="container">
          <section className='about-steps'>
            {
              aboutText.howWork.stages.map((stage, index)=> (
                  <div key={`about-stage-${index}`} className="about-steps__item">
                    <h2>{stage.title[locale]}</h2>
                    <ul>
                      {
                        stage.list[locale] &&stage.list[locale].map((punct, index)=>(
                            <li key={`about-stage-punct-${index}`}>{punct}</li>
                        ))
                      }
                    </ul>
                  </div>
              ))
            }
          </section>
        </div>

        <section className="about-sponsors">
          <div className="menu-section">
            <h2 className={halvar.className}>{aboutText.clients.title[locale]}</h2>
            <div className="about-sponsors__list">
              <LogosSlider aboutText={aboutText}/>
            </div>
          </div>
        </section> 
      </div>
      <Outline/>
    </div>
  );
};

export default memo(observer(About));