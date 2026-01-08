'use client'
import './for-kids.scss';

import HeadingSection from '@/components/heading-section/HeadingSection';
import KidsFooter from '@/components/_footers/kids-footer/KidsFooter';
import ProjectList from '@/components/project-list/ProjectList';
import Showreel from "@/components/showreel/Showreel";
import {useLocale} from "@/components/_hooks/useLocale";
import {IFooterKids, ILandingText, IMenuSectionTitle, IProject} from "@/typesData";
import {memo} from "react";

interface Proos{
  landingText: ILandingText
  projects?: IProject[]
}

const ForKids = ({landingText, projects}:Proos) => {
  const locale= useLocale()

  return (
    <div className='for-kids'>
      <Showreel video="kids"/>
      <HeadingSection
        title={landingText.title[locale]}
        text={landingText.text[locale]}
        subtitle="/Assets/Slides/Animations/Images/Kids/subtitle.svg"
        image="/Assets/Slides/Animations/Images/Kids/heading.png"
        className='for-kids__heading'
      />
      <div className="for-kids__projects-wrap">
      <ProjectList className="for-kids__projects" title='kids' projects={projects}/>
      </div>

      <KidsFooter />
    </div>
  );
};

export default memo(ForKids);