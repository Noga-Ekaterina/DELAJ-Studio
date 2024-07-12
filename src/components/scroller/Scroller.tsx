'use client'
import { createContext, FC, useEffect, useRef, useState } from 'react';
import './scroller.scss';
import { IWithChildren } from '@/types';
import { useHash } from '@/components/_hooks/useHash';
import { useViewport } from '@/components/_hooks/useViewport';
import { modalHashes } from '@/vars';

const Scroller: FC<IWithChildren> = (props) => {
  const hash = useHash();
  const viewport = useViewport();
  const [translate, setTranslate] = useState(0);
  const [lineStyles, setLineStyles] = useState('default');
  const isModal = modalHashes.includes(hash) || hash === 'menu';
  const getPureHash = () => {
    const paramsIndex = hash.indexOf('?');
    return (paramsIndex > 0) ? hash.slice(0, paramsIndex) : hash.slice(0);
  }

  useEffect(() => {
    if (hash) {
      const pureHash = getPureHash();
      const section = document.querySelector(`[data-name="${pureHash}"]`);
      //@ts-ignore
      const offset = section?.offsetTop || 0;
      setTranslate(-offset);
    }
  },[hash, viewport]);

  useEffect(() => {
    const pureHash = getPureHash();
    
    switch(pureHash) {
      case 'career': {
        setLineStyles('caree')
      }
    }
  },[hash])

  return (

    <div className='scroller'>
      <div 
        className="scroller-content"
        style={{transform:  `translateY(${translate}px)`}}
      >
      
        {props.children}  
      </div>

      {/* Цветные линии сверху и снизу */}
      <div 
          className="outline topline"
          style={{
            'career' : { color: '#00C2FF'},
            'ideas' : { color: "#8BE200"},
            'contacts' : { color: '#007BAD' },
            'faq' : { color: '#FF1267' },
            'about' : { color: '#F12B00' }  
          }[getPureHash()] || {display: 'none'}} 
        ></div>
      <div 
        className="outline underlines"
        style={{display: isModal ? 'flex' : 'none'}}
      >
        <div className="underlines-item blue"></div>
        <div className="underlines-item yellow"></div>
        <div className="underlines-item red"></div>
        <div className="underlines-item purple"></div>
      </div>
    </div>
  );
};

export default Scroller;