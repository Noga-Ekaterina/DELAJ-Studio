'use client';
import { IWithClass } from '@/types';
import { FC } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

//Images
import logo from '../../../public/images/header-logo.svg';
import darkLogo from '../../../public/kids/logo.svg';
import burger from '../../../public/images/header-burger.svg';
import { usePathname } from 'next/navigation';

import './header.scss';

const icons = {
  light: {
    logo: logo,
    burger: burger
  },
  dark: {
    logo: logo,
    burger: burger
  }
}

const Header: FC<IWithClass> = (props) => {
  const className = cn('header', props.className);
  const path = usePathname();
  const extludes = ['/', '/menu'];

    return (
    <header className={className}>
      <div className="container">
        {!extludes.some(item => path.includes(item)) && (
          <Link href="/">
            <Image src={logo} alt=""/>
          </Link>
        ) || <div></div>}
            
        <Link href="/menu" className='header-burger' prefetch>
          <Image src={burger} alt=""/>
        </Link>
      </div>
    </header>
  );
};

export default Header;