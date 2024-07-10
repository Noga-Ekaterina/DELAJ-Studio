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
    onClick?: () => void
  }[]
}

const BreadCrumbs: FC<Props> = (props) => {
  const className = classNames('bread-crumbs', props.className);

  return (
    <div className={className}>
      {props.links.map((link, index, array) => (
        <div className={('bread-crumbs__item')} key={'bread-crumb' + index}>
          { (link.onClick) 
              ? <button className='bread-crumbs__item-btn' onClick={link.onClick}>{link.text}</button>
              : <div className='bread-crumbs__item-btn'>{link.text}</div>
          } 
          {index + 1 !== array.length && <Image className='bread-crumbs__icon' src={arrow} alt="" />}
        </div>
      ))}  
    </div>
  );
};

export default BreadCrumbs;