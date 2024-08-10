'use client';
import { IWithChildren, IWithClass } from '@/types';
import { FC, memo, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import './section-wrap.scss';
import classNames from 'classnames';
import { useHash } from '../_hooks/useHash';
import store from "@/store/store";

interface Props extends IWithClass, IWithChildren {
  id: string
}

const Section: FC<Props> = (props) => {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const className = cn('section-wrap', props.className)
  const hash = useHash()
  const [hidden, setHidden] = useState(true)
  const {isModalMenuOpened}=store

  useEffect(() => {
      // const {top, bottom}= (ref.current as HTMLDivElement).getBoundingClientRect()
      //
      // if (top> window.innerHeight || bottom<0){
      //   setHiden(true)
      // }
    // setHiden(props.id==hash)
    console.log(hash)
    if (containerRef.current && props.id==hash && !isModalMenuOpened) {
      // setHidden(false)
      (containerRef.current as HTMLDivElement).style.display="block"
      console.log("show block")
    } else if (containerRef.current && (props.id!=hash || isModalMenuOpened)){
      // setTimeout(()=> setHidden(true), 1000)
      (containerRef.current as HTMLDivElement).style.display="none"
    }
  }, [containerRef.current, hash, isModalMenuOpened]);

  // useEffect(() => {
  //   if (props.id==hash && !isModalMenuOpened) {
  //     setHidden(false)
  //   }
  // }, [hidden]);


  return (
    <section
      className={className} 
      ref={containerRef}
      data-name={props.id}
      // style={{display: hidden? "none": "block"}}
      // id={props.id}
    >
      <div 
        ref={ref} 
        className={classNames(
          "section-wrap__content", 
        )}
      >
        {props.children}
      </div>
    </section>
  );
};

export default observer(Section);