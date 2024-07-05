import { FC } from 'react';
import './for-kids.scss';

//Images
import headingImage from '../../../../public/images/kids/heading.png';

import HeadingSection from '@/components/heading-section/HeadingSection';
import KidsFooter from '@/components/kids-footer/KidsFooter';
import KidsWallpapper from '@/components/kids-wallpapper/KidsWallpapper'; 
import ProjectList from '@/components/project-list/ProjectList';

const ForKids = () => {
  return (    
    <div className='for-kids'>
      <HeadingSection 
        title="детская анимация"
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

export default ForKids;