'use client'
import { FC, useEffect, useRef, useState } from 'react';
import './scroller.scss';
import { IWithChildren } from '@/types';
import { useHash } from '@/utils/useHash';
import { useViewport } from '@/utils/useViewport';

const Scroller: FC<IWithChildren> = (props) => {
  const hash = useHash();
  const viewport = useViewport();
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    if (hash) {
      const section = document.getElementById(hash);
      
      section?.scrollIntoView({behavior: 'smooth'})
    }
  },[hash, viewport]);


  return (
    <div className='scroller'>
      <div 
        className="scroller-content"
        style={{transform:  `translateY(-${translate}px)`}}
      >
      
        {props.children}  
      </div>
    </div>
  );
};

export default Scroller;