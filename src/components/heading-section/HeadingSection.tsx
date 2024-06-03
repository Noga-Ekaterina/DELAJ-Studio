import { IWithClass } from '@/types';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import cn from 'classnames';
import './heading-section.scss';
import { circe, halvar } from '@/fonts';

interface Props extends IWithClass {
  title: string
  image: StaticImageData
  backgroundImage: StaticImageData
}

const HeadingSection: FC<Props> = (props) => {
  const className = cn('heading-section', props.className);

  return (
    <section className={className}>
      <div className="container">
        <h1 className={halvar.className}>{props.title}</h1>
        
        <div className={cn('heading-section__text', circe.className)}>
          <p>ДЕЛАЙ — профессиональная анимационная студия полного цикла и анимационное агентство, специализируемся на создании различного анимационного контента. Наша команда занимается полным циклом производства анимационных коротких метров, полных метров и сериалов в 2D и 3D технике.</p>
          <p>А еще мы осуществляем помощь в производстве на разных этапах: от сценария до звукорежиссуры.</p>
        </div>

        <div className="heading-section__scetch">
          <Image 
            src={props.image} 
            className='heading-section__scetch-image' 
            alt="" 
          />
          <Image 
            src={props.backgroundImage} 
            className='heading-section__scetch-bg' 
            alt="" 
          />
        </div>
      </div>
    </section>
  );
};

export default HeadingSection;