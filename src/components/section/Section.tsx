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