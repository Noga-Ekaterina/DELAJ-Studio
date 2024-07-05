import { FC } from 'react';
import BreadCrumbs from '@/components/bread-crumbs/BreadCrumbs';
import '../_sections/menu/menu.scss';
import './career-slider.scss';
import { circe } from '@/fonts';
import classNames from 'classnames';
import { ICareer } from '@/types';
import { data } from '../_sections/career/Career';
import CareerSliderItem from './CareerSliderItem';
import getFilePaths from '@/utils/getFilePaths';

interface Props {
  item: ICareer
}

const CareerSlider: FC<Props> = ({ item }) => {

  return (
    <>
    <div className={classNames('career-slider', circe.className)}>
      <BreadCrumbs 
          links={[
            {text: 'вакансии', href: '#career'},
            {text: item.title}
          ]}
        />

        <h2>{item.title}</h2>
        <div className="career-slider__options">
          <div className=" options-item options-freelance">Freelance</div>
          <div className=" options-item options-opened">Открытая</div>
        </div>

        <div className="career-slider__body">
          <CareerSliderItem />
        </div>

        <a className='career-slider__back' href="#career">еще вакансии</a>
    </div>
    </>
  );
};

export default CareerSlider;