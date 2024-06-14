import ContentWrap from '@/components/content-wrap/ContentWrap';
import HeadingSection from '@/components/heading-section/HeadingSection';
import './for-adult.scss';

// Images
import headingImage from '../../../public/images/adult/heading.png';
import AdultFooter from '@/components/adult-footer/AdultFooter';
import ProjectList from '@/components/project-list/ProjectList';

import first from '../../../public/images/data/adult-data/1.png';
import second from '../../../public/images/data/adult-data/2.png';
import third from '../../../public/images/data/adult-data/3.png';
import fourth from '../../../public/images/data/adult-data/4.png';
import fifth from '../../../public/images/data/adult-data/5.png';
import sixth from '../../../public/images/data/adult-data/6.png';
import seventh from '../../../public/images/data/adult-data/1.png';
import eihth from '../../../public/images/data/adult-data/2.png';
import ninth from '../../../public/images/data/adult-data/3.png';
import ten from '../../../public/images/data/adult-data/4.png';
import eleven from '../../../public/images/data/adult-data/5.png';

import { ProjectItem } from '@/types';
import { FC } from 'react';

const data: ProjectItem[] = [
  { id: 11, preview: '/images/data/adult-data/1.png' },
  { id: 1, preview: '/images/data/adult-data/2.png' },
  { id: 2, preview: '/images/data/adult-data/3.png' },
  { id: 3, preview: '/images/data/adult-data/4.png' },
  { id: 4, preview: '/images/data/adult-data/5.png' },
  { id: 5, preview: '/images/data/adult-data/6.png' },
  { id: 6, preview: '/images/data/adult-data/1.png' },
  { id: 7, preview: '/images/data/adult-data/2.png' },
  { id: 8, preview: '/images/data/adult-data/3.png' },
  { id: 9, preview: '/images/data/adult-data/4.png' },
  { id: 10, preview: '/images/data/adult-data/5.png' },
  { id: 11, preview: '/images/data/adult-data/2.png' },
];


const page: FC = () => {
  return (
    <ContentWrap className='for-adult'>
      <HeadingSection
        className='for-adult__heading'
        title='взрослая анимация'
        image={headingImage}
      />
      <ProjectList data={data}/>
      <AdultFooter />
    </ContentWrap>
  );
};

export default page;