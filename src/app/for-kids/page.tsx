import { FC } from 'react';
import './for-kids.scss';
import ContentWrap from '@/components/content-wrap/ContentWrap';

//Images
import frogImage from '../../../public/images/kids/heading-frog.png';
import scetchBgImage from '../../../public/images/kids/heading-kids-scetch.png';

import HeadingSection from '@/components/heading-section/HeadingSection';
import KidsFooter from '@/components/kids-footer/KidsFooter';

const page: FC = () => {
  return (
    <ContentWrap className='for-kids'>
      <HeadingSection 
        title="детская анимация"
        image={frogImage}
        backgroundImage={scetchBgImage}
      />
      <KidsFooter />
    </ContentWrap>
  );
};

export default page;