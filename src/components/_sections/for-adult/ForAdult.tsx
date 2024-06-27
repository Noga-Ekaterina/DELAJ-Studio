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


const ForAdult: FC = () => {
  return (
    <div className='for-adult'>
      <HeadingSection
        className='for-adult__heading'
        title='взрослая анимация'
        image={headingImage}
      />
      <div className="for-adult__projects-wrap ">
        <ProjectList data={data}/>
        <LandingSwitchButton 
          className='for-adult__switch' 
          render={() => <AdultButton />}
          to='kids'
        />
      </div>

      <AdultFooter />

    </div>
  );
};

export default ForAdult;