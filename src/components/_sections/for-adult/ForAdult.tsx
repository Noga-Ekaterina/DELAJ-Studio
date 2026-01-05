'use client';
import HeadingSection from '@/components/heading-section/HeadingSection';
import './for-adult.scss'
import AdultFooter from '@/components/_footers/adult-footer/AdultFooter';
import ProjectList from '@/components/project-list/ProjectList';
import {useLocale} from "@/components/_hooks/useLocale";
import {FC, memo} from 'react';
import Showreel from "@/components/showreel/Showreel";
import {ILandingText} from "@/typesData";

interface Props{
  landingText: ILandingText
}


const ForAdult: FC<Props> = ({landingText}) => {
  const locale= useLocale()

  return (
    <div className='for-adult'>
      <Showreel video="adults"/>
      <HeadingSection
        className='for-adult__heading'
        title={landingText.title[locale]}
        subtitle="/Assets/Slides/Animations/Images/Adults/subtitle.svg"
        text={landingText.text[locale]}
        image="/Assets/Slides/Animations/Images/Adults/heading.png"
      />
      <div className="for-adult__projects-wrap ">
        <ProjectList title='adults' />
      </div>

      <AdultFooter />

    </div>
  );
};

export default memo(ForAdult);