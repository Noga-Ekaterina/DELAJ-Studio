'use client';
import { FC } from 'react';
import './kids-screen.scss';
import screenPicture from '../../../public/images/kids/screen-picture.png';
import Image from 'next/image';
import Link from 'next/link';
import { IWithClass } from '@/types';
import cn from 'classnames';

const KidsScreen: FC<IWithClass> = (props) => {
  const className = cn('kids-screen', props.className || '');

  return (
    <Link href="for-kids" className={className}>
      <div className="kids-screen__picture" id="kids-screen-black">
      </div>
      <div className="kids-screen__picture" id="kids-screen-picture">
        <Image src={screenPicture} alt="" />
      </div>
      <div className="kids-screen__picture" id="kids-screen-white">

      </div>
      <div className="kids-screen__picture" id="kids-screen-logo">

      </div>
      <div className="kids-screen__picture" id="kids-screen-green">

      </div>
      <div className="kids-screen__picture" id="kids-screen-blue">

      </div>
      <div className="kids-screen__picture" id="kids-screen-red">

      </div>
      <div className="kids-screen__picture" id="kids-screen-purple">

      </div>
    </Link>
  );
} 

export default KidsScreen;