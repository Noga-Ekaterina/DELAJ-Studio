'use client';
import { IWithChildren, IWithClass } from '@/types';
import { FC, memo, useEffect, useRef } from 'react';
import cn from 'classnames';
import './section-wrap.scss';
import { useHash } from '@/utils/useHash';
import { useViewport } from '@/utils/useViewport';
import classNames from 'classnames';

interface Props extends IWithClass, IWithChildren {
  id: string
  prevId?: string | null
  nextId?: string | null
}

const SectionWrap: FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null); 
  const ref = useRef<HTMLDivElement>(null);
  const hash = useHash();
  const viewport = useViewport();
  const className = cn('section-wrap', props.className);

  useEffect(() => {
    if (window && ref && window.location.hash === `#${props.id}`) {
      containerRef.current?.scrollIntoView({});
    }
  },[hash, viewport])

  const swipeDown = () => {
    if (window && ref.current) {
      const { bottom } = ref.current.getBoundingClientRect();
      const bottomOffset = window.innerHeight - Math.floor(bottom) >= 0;
      if ( typeof props.nextId === "string" && bottomOffset ) {
        window.location.hash = props.nextId;
      }
    }
  }

  const swipeUp = () => {
    if (window && ref.current) {
      const { top } = ref.current.getBoundingClientRect();

      if (props.prevId && top === 0) {
         window.location.hash = props.prevId;
      }
    }
  }

  const handleScroll = (e: React.WheelEvent<HTMLElement>) => {
    if (e.deltaY > 0) {
      swipeDown();
    } else if (e.deltaY < 0) {
      swipeUp();
    }
  }

  const handleTouch = (e: React.TouchEvent<HTMLElement>) => {
    // console.log(e.touches, e.touches[1])
    // const isUpGoing = e.touches[0].clientY < e.touches[1].clientY;
    // if (e.touches[1] && isUpGoing ) {
    //   swipeUp();
    // } else {
    //   swipeDown()
    // }
  }

  return (
    <section 
      onWheel={handleScroll} 
      onTouchMove={handleTouch}
      className={className} 
      id={props.id}
      ref={containerRef}
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

export default SectionWrap;