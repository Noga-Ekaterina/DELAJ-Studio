import { IWithClass } from '@/types';
import { FC } from 'react';
import cn from 'classnames';
import './heading-section.scss';
import { circe, courierNew } from '@/fonts';

interface Props extends IWithClass {
  title: string
  text: string,
  image: string,
  subtitle: string
}

const HeadingSection: FC<Props> = (props) => {
  const className = cn('heading-section', props.className);

  return (
    <section className={className}>
      <div className="container">

        <div className={cn('heading-section__text', circe.className)}>
          <h1 className={circe.className}>{props.title}</h1>
          <img src={props.subtitle} alt="" className="heading-section__subtitle"/>
          <p>{props.text}</p>
        </div>

        <img
            src={props.image}
            className='heading-section__image' 
            alt="" 
          />
      </div>
    </section>
  );
};

export default HeadingSection;