import { FC } from 'react';
import './for-kids.scss';
import ContentWrap from '@/components/content-wrap/ContentWrap';

//Images
import headingImage from '../../../public/images/kids/heading.png';

import HeadingSection from '@/components/heading-section/HeadingSection';
import KidsFooter from '@/components/kids-footer/KidsFooter';
import KidsWallpapper from '@/components/kids-wallpapper/KidsWallpapper';
import KidsProjectList from '../../components/project-list/KidsProjectList';

const Page = () => {
  return (    
    <ContentWrap className='for-kids'>
      <HeadingSection 
        title="детская анимация"
        image={headingImage}
        className='for-kids__heading'
      />
      <div className="for-kids__projects-wrap">
        <KidsProjectList />
      </div>
      <KidsFooter />
    </ContentWrap>
  );
};

export default Page;