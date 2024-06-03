'use client';
import { IWithClass } from '@/types';
import { FC } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

//Images
import logo from '../../../public/images/header-logo.svg';
import burger from '../../../public/images/header-burger.svg';
import { usePathname } from 'next/navigation';

import './header.scss';

const Header: FC<IWithClass> = (props) => {
  const className = cn('header', props.className);
  const path = usePathname();

  return (
    <header className={className}>
      <div className="container">
        {path !== '/' && (
          <Link href="/">
            <Image src={logo} alt=""/>
          </Link>
        )}
            
        <Link href="/menu" className='header-burger'>
          <Image src={burger} alt=""/>
        </Link>
      </div>
    </header>
  );
};

export default Header;