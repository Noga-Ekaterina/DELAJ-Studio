'use client';
import { IWithClass } from '@/types';
import { FC } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

//Images
import logo from '../../../public/images/header-logo.svg';
import darkLogo from '../../../public/images/logo.svg';
import burger from '../../../public/images/header-burger.svg';
import close from '../../../public/images/close.svg';
import darkBurger from '../../../public/images/dark-burger.svg';

import { usePathname, useRouter } from 'next/navigation';
import './header.scss';
import { observer } from 'mobx-react-lite';
import store from '@/store/store';

const icons = {
  light: {
    logo: logo,
    burger: burger
  },
  dark: {
    logo: darkLogo,
    burger: darkBurger
  }
}

const Header: FC<IWithClass> = (props) => {
  const className = cn('header', props.className);
  const path = usePathname();
  const router = useRouter();
  const isMainSceen = path === '/';
  const isMenu = path.includes('/menu');
  const { headerTheme } = store;

    return (
    <header className={className}>
      <div className="container">
        {(!isMainSceen && !isMenu) 
          ? <Link href="/">
              <Image className='header-logo' src={icons[headerTheme].logo} alt=""/>
            </Link>
          : <div></div> 
        }
        
        {(!isMenu) 
          ? <Link href="/menu" className='header-burger' prefetch>
            <Image src={icons[headerTheme].burger} alt=""/>
          </Link>
          : <div></div>
        }
        
      </div>
    </header>
  );
};

export default observer(Header);