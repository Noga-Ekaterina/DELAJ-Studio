'use client'
import { createContext, FC, useEffect, useRef, useState } from 'react';
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
      const pureHash = (paramsIndex > 0) ? hash.slice(0, paramsIndex + 1) : hash.slice(0);
      const section = document.querySelector(`[data-name="${pureHash}"]`);
      //@ts-ignore
      const offset = section?.offsetTop || 0;
      setTranslate(-offset);
    }
  },[hash, viewport]);

  return (
    <div className='scroller'>
      <div 
        className="scroller-content"
        style={{transform:  `translateY(${translate}px)`}}
      >
      
        {props.children}  
      </div>
    </div>
  );
};

export default Scroller;