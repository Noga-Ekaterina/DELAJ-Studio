import { IWithClass } from '@/types';
import classNames from 'classnames';
import { FC } from 'react';
import arrow from '../../../public/images/bread-crumbs-arrow.svg';
import Image from 'next/image';
import './bread-crumbs.scss';
import { circe } from '@/fonts';

interface Props extends IWithClass{
  links : {
    text: string
    href?: string
  }[]
}

const BreadCrumbs: FC<Props> = (props) => {
  const className = classNames('bread-crumbs', props.className, circe.className);

  return (
    <div className={className}>
      {props.links.map((link, index, array) => (
        <div className={'bread-crumbs__item'} key={'bread-crumb' + index}>
          { (link.href) 
              ? <a href={link.href}>{link.text}</a>
              : <span>{link.text}</span>
          } 
          {index + 1 !== array.length && <Image className='bread-crumbs__icon' src={arrow} alt="" />}
        </div>
      ))}  
    </div>
  );
};

export default BreadCrumbs;