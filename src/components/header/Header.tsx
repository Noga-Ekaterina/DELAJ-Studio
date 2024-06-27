'use client';
import { HeaderTheme, IWithClass } from '@/types';
import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

//Images
import kidsLogo from '../../../public/images/kids-header-logo.svg';  
import adultLogo from '../../../public/images/adult-header-logo.svg';
import logo from '../../../public/images/logo.svg';
import burger from '../../../public/images/header-burger.svg';
import blueBurger from '../../../public/images/blue-burger.svg';
import darkBurger from '../../../public/images/dark-burger.svg';
import mail from '../../../public/images/mail.svg';
import darkMail from '../../../public/images/white-mail.svg';
import blueMail from '../../../public/images/blue-mail.svg';

import './header.scss';
import { useHash } from '@/utils/useHash';

const styles = {
  default: {
    mail: mail,
    logo: logo,
    burger: darkBurger,
  },
  kids: {
    mail: blueMail,
    logo: kidsLogo,
    burger: blueBurger,
  },
  adult: {
    mail: darkMail,
    logo: adultLogo,
    burger: burger,
  },
  mainScreen: {
    mail: darkMail,
    logo: logo,
    burger: burger,
  }
}

const Header: FC<IWithClass> = (props) => {
  const className = cn('header', props.className);
  const [theme, setTheme] = useState<HeaderTheme>('default');
  const hash = useHash();

  useEffect(() => {
    
  },[hash])


    return (
    <header className={className} >
      <div className="container">
        <a href="#contacts" className='header-burger'>
          <Image src={styles[theme].mail} alt=""/>
        </a>

        {theme !== 'mainScreen' && (
          <a href="#main-screen">
            <Image className='header-logo' src={styles[theme].logo} alt=""/>
          </a>
        )}
        
        <a href="#menu" className='header-burger'>
          <Image src={styles[theme].burger} alt=""/>
        </a>
      </div>
    </header>
  );
};

export default Header;