'use client'
import React, {memo} from 'react';
import '../menu/menu.scss' ;
import './about.scss';
import general from "@/store/text/general";
import {observer} from "mobx-react-lite";

// Images
import aboutHero from '../../../../public/Assets/Slides/About/Images/1.png';
import aboutHeroSketch from '../../../../public/Assets/Slides/About/Images/2.png';
import aboutSketch from '../../../../public/Assets/Slides/About/Images/3.png';

import Image from 'next/image';
import { halvar, circe } from '@/fonts';
import cn from 'classnames';

import sponsor1 from '../../../../public/images/modals/sponsor-1.png'
import sponsor2 from '../../../../public/images/modals/sponsor-2.png'
import sponsor3 from '../../../../public/images/modals/sponsor-3.png'
import sponsor4 from '../../../../public/images/modals/sponsor-4.png'
import sponsor5 from '../../../../public/images/modals/sponsor-5.png'
import sponsor6 from '../../../../public/images/modals/sponsor-6.png'
import sponsor7 from '../../../../public/images/modals/sponsor-7.png'
import sponsor8 from '../../../../public/images/modals/sponsor-8.png'
import sponsor9 from '../../../../public/images/modals/sponsor-9.png'
import sponsor10 from '../../../../public/images/modals/sponsor-10.png'
import sponsor11 from '../../../../public/images/modals/sponsor-11.png'
import sponsor12 from '../../../../public/images/modals/sponsor-12.png'
import sponsor13 from '../../../../public/images/modals/sponsor-13.png'
import sponsor14 from '../../../../public/images/modals/sponsor-14.png'
import sponsor15 from '../../../../public/images/modals/sponsor-15.png'
import sponsor16 from '../../../../public/images/modals/sponsor-16.png'
import sponsor17 from '../../../../public/images/modals/sponsor-17.png'
import sponsor18 from '../../../../public/images/modals/sponsor-18.png'
import sponsor29 from '../../../../public/images/modals/sponsor-19.png'
import sponsor20 from '../../../../public/images/modals/sponsor-20.png'
import sponsor21 from '../../../../public/images/modals/sponsor-21.png'
import sponsor22 from '../../../../public/images/modals/sponsor-22.png'
import sponsor23 from '../../../../public/images/modals/sponsor-23.png'
import sponsor24 from '../../../../public/images/modals/sponsor-24.png'
import Showreel from '@/components/showreel/Showreel';
import {useLocale} from "@/components/_hooks/useLocale";
import Outline from "@/components/outline/Outline";
import home from "@/store/text/home";
import LogosSlider from "@/components/logos-slider/LogosSlider";
import FlashingList from "@/components/flashing-list/FlashingList";

const About = () => {
  const locale=useLocale()
  const {menuSectionTitle}=general
  const {aboutText}=home

  if (!aboutText) return <div></div>

  return (
    <div className={cn("menu", circe.className)}>
      <div className={'menu-inner about'}>
        <div className="about-top">

          <section className='menu-section'>
            <h1 className={('menu-link')}>{menuSectionTitle&&menuSectionTitle.about[locale]}</h1>
          </section>

          <section className='about-hero'>
              
              <Image className="about-hero__picture" src={aboutHero} alt="" />
            
              <div className='about-hero__paragraph'>
                <p>{aboutText.text1[locale]}</p>
              </div>
              
              <div className="about-text">
                <h2 className={halvar.className}>{aboutText.whatDo.title[locale]}</h2>
                <p>{aboutText.whatDo.text[locale]}</p>
              </div>
              <Image className='about-hero__sketch' src={aboutHeroSketch} alt="" />
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

        {/* <Image className='about-image' src={bigImage} alt=""/> */}
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
            <Image className='about-work__sketch' src={aboutSketch} alt=""/>
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
              <LogosSlider/>
            </div>
          </div>
        </section> 
      </div>
      <Outline/>
    </div>
  );
};

export default memo(observer(About));