'use client';
import HeadingSection from '@/components/heading-section/HeadingSection';
import './for-adult.scss';

// Images
import headingImage from '../../../../public/images/adult/heading.png';
import AdultFooter from '@/components/adult-footer/AdultFooter';
import ProjectList from '@/components/project-list/ProjectList';

import { ProjectItem } from '@/types';
import { FC } from 'react';
import LandingSwitchButton from '@/components/landing-switch-button/LandingSwitchButton';
import AdultButton from '@/components/landing-switch-button/AdultButton';
import Showreel from "@/components/showreel/Showreel";


const ForAdult: FC = () => {
  return (
    <div className='for-adult'>
      <Showreel className='landings-showreel'/>
      <HeadingSection
        className='for-adult__heading'
        title='взрослая анимация'
        image={headingImage}
      />
      <div className="for-adult__projects-wrap ">
        <ProjectList title='adult' />
      </div>

      <AdultFooter />

    </div>
  );
};

export default ForAdult;