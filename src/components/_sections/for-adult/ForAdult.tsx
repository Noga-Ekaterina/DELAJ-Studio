'use client';
import HeadingSection from '@/components/heading-section/HeadingSection';
import './for-adult.scss';

// Images
import headingImage from '../../../../public/Assets/Slides/Animations/Images/Adults/heading.png';
import subtitle from "../../../../public/Assets/Slides/Animations/Images/Adults/subtitle.svg"
import AdultFooter from '@/components/adult-footer/AdultFooter';
import ProjectList from '@/components/project-list/ProjectList';
import homeText from "@/store/text/home";
import {useLocale} from "@/components/_hooks/useLocale";
import {observer} from "mobx-react-lite";

import { ProjectItem } from '@/types';
import { FC } from 'react';
import LandingSwitchButton from '@/components/landing-switch-button/LandingSwitchButton';
import AdultButton from '@/components/landing-switch-button/AdultButton';
import Showreel from "@/components/showreel/Showreel";


const ForAdult: FC = () => {
  const {landingsText}=homeText
  const locale= useLocale()

  if (!landingsText) return <div className="for-adult"/>

  return (
    <div className='for-adult'>
      <Showreel video="adults"/>
      <HeadingSection
        className='for-adult__heading'
        title={landingsText.adult.title[locale]}
        subtitle={subtitle}
        text={landingsText.adult.text[locale]}
        image={headingImage}
      />
      <div className="for-adult__projects-wrap ">
        <ProjectList title='adults' />
      </div>

      <AdultFooter />

    </div>
  );
};

export default observer(ForAdult);