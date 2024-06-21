'use client';
import store from '@/store/store';
import { IWithChildren } from '@/types';
import { observer } from 'mobx-react-lite';
import {FC, useRef } from 'react';


const DarkHeaderSection: FC<IWithChildren> = observer(({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setHeaderTheme, headerTheme } = store
  const options = {
    root: null, // document && document.querySelector('.header'),
    rootMargin: '0px',
    threshold: [.3, .9]
  };
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      const [ entry ] = entries;
      if (entry.isIntersecting) {
        setHeaderTheme('dark');
      } else {
        setHeaderTheme('light');
      }
      console.log(headerTheme);
    },
    options
  );

  if (ref.current) intersectionObserver.observe(ref.current);

  return (
    <div ref={ref} >
      {children}
    </div>
  );
})

export default DarkHeaderSection;