import { IWithClass } from '@/types';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import cn from 'classnames';
import './heading-section.scss';
import { halvar, courierNew } from '@/fonts';

interface Props extends IWithClass {
  title: string
  image: StaticImageData
}

const HeadingSection: FC<Props> = (props) => {
  const className = cn('heading-section', props.className);

  return (
    <section className={className}>
      <div className="container">

        <div className={cn('heading-section__text', courierNew.className)}>
          <h1 className={halvar.className}>{props.title}</h1>
          <p>Наша команда занимается полным циклом производства детской анимации коротких метров, полных метров и
            сериалов в 2D и 3D технике.</p>
        </div>

        <Image
            src={props.image}
            className='heading-section__image' 
            alt="" 
          />
      </div>
    </section>
  );
};

export default HeadingSection;