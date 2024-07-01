'use client';
import { FC } from 'react';
import './for-kids.scss';

//Images
import headingImage from '../../../../public/images/kids/heading.png';

import HeadingSection from '@/components/heading-section/HeadingSection';
import KidsFooter from '@/components/kids-footer/KidsFooter';
import KidsProjectList from '../../../components/project-list/KidsProjectList';
import LandingSwitchButton from '@/components/landing-switch-button/LandingSwitchButton';
import KidsButton from '../../landing-switch-button/KidsButton'; 

const ForKids = () => {
  return (    
    <div className='for-kids'>
      <HeadingSection 
        title="детская анимация"
        image={headingImage}
        className='for-kids__heading'
      />
      <div className="for-kids__projects-wrap">
        <KidsProjectList />
      </div>

      <KidsFooter />
    </div>
  );
};

export default ForKids;