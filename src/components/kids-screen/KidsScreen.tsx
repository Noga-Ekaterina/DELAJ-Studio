'use client';
import { FC } from 'react';
import './kids-screen.scss';
import Image from 'next/image';
import Link from 'next/link';
import { IWithClass } from '@/types';
import cn from 'classnames';

// Images
import screenPicture from '../../../public/images/kids/screen-picture.png';
import blackGirlPicture from '../../../public/images/kids/screen-girl-1.png';
import frogPicture from '../../../public/images/kids/screen-frog.png';
import bearPicture from '../../../public/images/kids/screen-bear.png';
import lenyaPicture from '../../../public/images/kids/screen-lenya.png';
import purpleGirlPicture from '../../../public/images/kids/screen-girl-2.png';
import logo from '../../../public/images/kids/logo.svg';

import TextLogo from '../text-logo/TextLogo';
 
interface Props {
  isOpened: boolean
}

const KidsScreen: FC<Props> = (props) => {
  const className = cn('kids-screen', props.isOpened ? 'opened' : '');

  return (
    <div className={className}>
      <div className="kids-screen__picture" id="kids-screen-black">
        <Image src={blackGirlPicture} alt=''/>
      </div>
      <div className="kids-screen__picture" id="kids-screen-picture">
        <Image src={screenPicture} alt="" />
      </div>
      <div className="kids-screen__picture" id="kids-screen-white">
        <Image src={bearPicture} alt="" />
      </div>
      <div className="kids-screen__picture " id="kids-screen-logo">
        <div className="kids-screen__picture-logo">
          <Image src={logo} alt='' />
          <TextLogo className='kids-screen__text-logo' />
        </div>
      </div>
      <div className="kids-screen__picture" id="kids-screen-green">
        <Image src={frogPicture} alt=""/>
      </div>
      <div className="kids-screen__picture" id="kids-screen-blue">
        <Image src={lenyaPicture} alt=''/>
      </div>
      <div className="kids-screen__picture" id="kids-screen-red">

      </div>
      <div className="kids-screen__picture" id="kids-screen-purple">
        <Image src={purpleGirlPicture} alt=''/>
      </div>
    </div>
  );
} 

export default KidsScreen;