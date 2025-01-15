'use client'
import './for-kids.scss';
import homeText from "@/store/text/home";
import {observer} from "mobx-react-lite";

//Images
import headingImage from '../../../../public/Assets/Slides/Animations/Images/Kids/heading.png';
import subtitle from "../../../../public/Assets/Slides/Animations/Images/Kids/subtitle.svg"

import HeadingSection from '@/components/heading-section/HeadingSection';
import KidsFooter from '@/components/_footers/kids-footer/KidsFooter';
import ProjectList from '@/components/project-list/ProjectList';
import Showreel from "@/components/showreel/Showreel";
import {useLocale} from "@/components/_hooks/useLocale";
import {IFooterKids, ILandingText, IMenuSectionTitle} from "@/typesData";

interface Proos{
  landingText: ILandingText
}

const ForKids = ({landingText}:Proos) => {
  const locale= useLocale()

  return (
    <div className='for-kids'>
      <Showreel video="kids"/>
      <HeadingSection
        title={landingText.title[locale]}
        text={landingText.text[locale]}
        subtitle={subtitle}
        image={headingImage}
        className='for-kids__heading'
      />
      <div className="for-kids__projects-wrap">
      <ProjectList className="for-kids__projects" title='kids' />
      </div>

      <KidsFooter />
    </div>
  );
};

export default ForKids;