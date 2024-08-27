'use client'
import { IWithClass } from '@/types';
import classNames from 'classnames';
import { FC } from 'react';
import arrow from '../../../public/images/bread-crumbs-arrow.svg';
import Image from 'next/image';
import './bread-crumbs.scss';
import { circe } from '@/fonts';
import {useRouter} from "next/navigation";

interface Props extends IWithClass{
  links : {
    text: string
    path?: string
  }[]
}

const BreadCrumbs: FC<Props> = (props) => {
  const className = classNames('bread-crumbs', props.className);
  const router=useRouter()

  return (
    <div className={className}>
      {props.links.map((link, index, array) => (
        <div className={('bread-crumbs__item')} key={'bread-crumb' + index}>
          { (link.path)
              ? <button className='bread-crumbs__item-btn' onClick={()=>router.push(String(link.path), {scroll:false})}>{link.text}</button>
              : <div className='bread-crumbs__item-btn'>{link.text}</div>
          } 
          {index + 1 !== array.length && <Image className='bread-crumbs__icon' src={arrow} alt="" />}
        </div>
      ))}  
    </div>
  );
};

export default BreadCrumbs;