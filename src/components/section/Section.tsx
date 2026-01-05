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
  return (
    <section
      className={cn('section-wrap', props.className)}
      data-name={props.id}
      // style={{display: hidden? "none": "block"}}
      // id={props.id}
    >
      <div
        className={classNames(
          "section-wrap__content", 
        )}
      >
        {props.children}
      </div>
    </section>
  );
};

export default memo(Section);