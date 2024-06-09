import ContentWrap from '@/components/content-wrap/ContentWrap';
import HeadingSection from '@/components/heading-section/HeadingSection';
import './for-adult.scss';

// Images
import headingImage from '../../../public/images/adult/heading-image.png';
import headingBg from '../../../public/images/adult/heading-bg.png';
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

// export async function getStaticProps() {
//   const response = await fetch('http://localhost:3000/api/projects/'); 
//   const data = response.json();

//   return {
//     props: { projects: data }
//   }
// }

// interface Props {
//   projects: ProjectItem[]
// }

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
];


const page: FC = () => {
  return (
    <ContentWrap className='for-adult'>
      <HeadingSection
        className='for-adult__heading'
        title='взрослая анимация'
        image={headingImage}
        backgroundImage={headingBg}
      />
      <ProjectList data={data}/>
      <AdultFooter />
    </ContentWrap>
  );
};

export default page;