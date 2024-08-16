'use client'
import './for-kids.scss';
import homeText from "@/store/text/home";
import {observer} from "mobx-react-lite";

//Images
import headingImage from '../../../../public/Assets/Slides/Animations/Images/Kids/heading.png';
import subtitle from "../../../../public/Assets/Slides/Animations/Images/Kids/subtitle.svg"

import HeadingSection from '@/components/heading-section/HeadingSection';
import KidsFooter from '@/components/kids-footer/KidsFooter';
import KidsWallpapper from '@/components/kids-wallpapper/KidsWallpapper'; 
import ProjectList from '@/components/project-list/ProjectList';
import Showreel from "@/components/showreel/Showreel";
import {useLocale} from "@/components/_hooks/useLocale";

const ForKids = () => {
  const {landingsText}=homeText
  const locale= useLocale()

  if (!landingsText) return <div className="for-kids"/>

  return (
    <div className='for-kids'>
      <Showreel className='landings-showreel'/>
      <HeadingSection
        title={landingsText.kids.title[locale]}
        text={landingsText.kids.text[locale]}
        subtitle={subtitle}
        image={headingImage}
        className='for-kids__heading'
      />
      <div className="for-kids__projects-wrap">
      <ProjectList className="for-kids__projects" title='kids' Wallpapper={KidsWallpapper}/>
      </div>

      <KidsFooter />
    </div>
  );
};

export default observer(ForKids);