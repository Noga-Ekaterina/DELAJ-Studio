import { FC } from 'react';
import './for-kids.scss';
import ContentWrap from '@/components/content-wrap/ContentWrap';

//Images
import frogImage from '../../../public/images/kids/heading-frog.png';
import scetchBgImage from '../../../public/images/kids/heading-kids-scetch.png';

import first from '../../../public/images/data/kids-data/1.png';
import second from '../../../public/images/data/kids-data/2.png';
import third from '../../../public/images/data/kids-data/3.png';
import fourth from '../../../public/images/data/kids-data/4.png';
import fifth from '../../../public/images/data/kids-data/5.png';
import sixth from '../../../public/images/data/kids-data/6.png';
import seventh from '../../../public/images/data/kids-data/1.png';
import eihth from '../../../public/images/data/kids-data/2.png';
import ninth from '../../../public/images/data/kids-data/3.png';
import ten from '../../../public/images/data/kids-data/4.png';
import eleven from '../../../public/images/data/kids-data/5.png';
import twelfth from '../../../public/images/data/kids-data/6.png';

import { ProjectItem } from '@/types';

const data: ProjectItem[] = [
  { id: 1, preview: first },
  { id: 2, preview: second },
  { id: 3, preview: third },
  { id: 4, preview: fourth },
  { id: 5, preview: fifth },
  { id: 6, preview: sixth },
  { id: 7, preview: seventh },
  { id: 8, preview: eihth },
  { id: 9, preview: ninth },
  { id: 10, preview: ten },
  { id: 11, preview: eleven },
  { id: 12, preview: twelfth },
    
];

import HeadingSection from '@/components/heading-section/HeadingSection';
import KidsFooter from '@/components/kids-footer/KidsFooter';
import ProjectList from '@/components/project-list/ProjectList';
import KidsWallpapper from '@/components/kids-wallpapper/KidsWallpapper';

const page: FC = () => {
  return (
    <ContentWrap className='for-kids'>
      <HeadingSection 
        title="детская анимация"
        image={frogImage}
        backgroundImage={scetchBgImage}
        className='for-kids__heading'
      />
      <div className="for-kids__projects-wrap">
        <ProjectList className="for-kids__projects" data={data}/>
        <KidsWallpapper />
      </div>
      <KidsFooter />
    </ContentWrap>
  );
};

export default page;