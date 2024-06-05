import ContentWrap from '@/components/content-wrap/ContentWrap';
import HeadingSection from '@/components/heading-section/HeadingSection';
import { FC } from 'react';
import './for-adult.scss';

// Images
import headingImage from '../../../public/images/adult/heading-image.png';
import headingBg from '../../../public/images/adult/heading-bg.png';
import AdultFooter from '@/components/adult-footer/AdultFooter';

const page = () => {
  return (
    <ContentWrap className='for-adult'>
      <HeadingSection
        className='for-adult__heading'
        title='взрослая анимация'
        image={headingImage}
        backgroundImage={headingBg}
      />
      <AdultFooter />
    </ContentWrap>
  );
};

export default page;