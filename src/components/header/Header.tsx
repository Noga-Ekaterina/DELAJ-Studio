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
import close from '../../../public/images/close.svg';

import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const isMainSceen = path === '/';
  const isMenu = path.includes('/menu');

    return (
    <header className={className}>
      <div className="container">
        {(!isMainSceen && !isMenu) 
          ? <Link href="/">
              <Image src={logo} alt=""/>
            </Link>
          : <div></div>
        }
        
        {(isMenu) 
          ? <button type='button' onClick={() => router.back()}>
              <Image src={close} alt="" />
            </button>
          : <Link href="/menu" className='header-burger' prefetch>
              <Image src={burger} alt=""/>
            </Link>
        }
        
      </div>
    </header>
  );
};

export default Header;