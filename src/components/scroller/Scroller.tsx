'use client'
import { FC, useEffect, useRef, useState } from 'react';
import './scroller.scss';
import { IWithChildren } from '@/types';
import { useHash } from '@/components/_hooks/useHash';
import { useViewport } from '@/components/_hooks/useViewport';

const Scroller: FC<IWithChildren> = (props) => {
  const hash = useHash();
  const viewport = useViewport();
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    if (hash) {
      const paramsIndex = hash.indexOf('?');
      const pureHash = hash.slice(0, paramsIndex);
      const section = document.getElementById(pureHash);
      
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