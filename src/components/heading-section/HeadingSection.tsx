import { IWithClass } from '@/types';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import cn from 'classnames';
import './heading-section.scss';
import { circe, courierNew } from '@/fonts';

interface Props extends IWithClass {
  title: string
  text: string,
  image: StaticImageData,
  subtitle: StaticImageData
}

const HeadingSection: FC<Props> = (props) => {
  const className = cn('heading-section', props.className);

  return (
    <section className={className}>
      <div className="container">

        <div className={cn('heading-section__text', circe.className)}>
          <h1 className={circe.className}>{props.title}</h1>
          <Image src={props.subtitle} alt="" className="heading-section__subtitle"/>
          <p>{props.text}</p>
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