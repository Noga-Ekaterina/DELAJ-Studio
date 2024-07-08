'use client';
import { IWithChildren, IWithClass } from '@/types';
import { FC, memo, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './section-wrap.scss';
import classNames from 'classnames';
import { useHash } from '../_hooks/useHash';

interface Props extends IWithClass, IWithChildren {
  id: string
}

const Section: FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null); 
  const ref = useRef<HTMLDivElement>(null);
  const className = cn('section-wrap', props.className);
  const [nextName, setNextName] = useState<string | null>(null);
  const [prevName, setPrevName] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<null | number>(null)
  const [touchEnd, setTouchEnd] = useState<null | number>(null)

  const minSwipeDistance = 200;

  useEffect(() => {
    const nextSection = containerRef.current?.nextElementSibling;
    const prevSection = containerRef.current?.previousElementSibling;
    setNextName(nextSection?.getAttribute('data-name') || null);
    setPrevName(prevSection?.getAttribute('data-name') || null);

  },[ref]);


  const swipeDown = () => {
    if (window && ref.current) {
      const { bottom } = ref.current.getBoundingClientRect();
      const bottomOffset = window.innerHeight - Math.floor(bottom) >= 0;
      if ( bottomOffset ) {
        if (nextName) {
          ref.current?.scrollTo(0,0);
          window.location.hash = nextName;
        } else {
          window.location.hash = '';
        }
      } 
    }
  }

  const swipeUp = () => {
    if (window && ref.current) {
      const { top } = ref.current.getBoundingClientRect();

      if (top === 0) {
          if (prevName) {
            ref.current?.scrollTo(0,0);
            window.location.hash = prevName;
          } else {
            window.location.hash = 'main-screen';
          }
      } 
    }
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchEnd(null) 
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    setTouchEnd(e.targetTouches[0].clientY);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > minSwipeDistance
    const isSwipeDown = distance < -minSwipeDistance

    if (isSwipeUp) {
      swipeDown();
    } else if (isSwipeDown) {
      swipeUp();
    }
  }

  const handleScroll = (e: React.WheelEvent<HTMLElement>) => {
    if (e.deltaY > 0) {
      swipeDown();
    } else if (e.deltaY < 0) {
      swipeUp();
    }
  }

  return (
    <section 
      onWheel={handleScroll} 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className={className} 
      ref={containerRef}
      data-name={props.id}
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

export default memo(Section);