'use client';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
import './kids-wallpapper.scss';

import fst from '../../../public/images/kids/wall-1.png';
import scd from '../../../public/images/kids/wall-2.png';
import thr from '../../../public/images/kids/wall-3.png';
import frt from '../../../public/images/kids/wall-4.png';
import fvt from '../../../public/images/kids/wall-5.png';
import sxt from '../../../public/images/kids/wall-6.png';
import svn from '../../../public/images/kids/wall-7.png';
import egh from '../../../public/images/kids/wall-8.png';
import nin from '../../../public/images/kids/wall-9.png';
import boy from '../../../public/images/kids/wall-boy.png';

import Image, { StaticImageData } from 'next/image';

const images = [
  fst, scd, thr, frt, fvt, sxt, svn, egh, nin,
]

interface WallpapperImageProps{
  src: StaticImageData
  borderlineRef:  RefObject<HTMLDivElement>
  containerRef: RefObject<HTMLDivElement>
} 

const WallpapperImage: FC<WallpapperImageProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="kids-wallpapper__row">
      <Image src={props.src} alt=''/>
    </div>
  );
}

const KidsWallpapper: FC = () => {
  const [imgList, setImgList] = useState<StaticImageData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const boyRef = useRef<HTMLDivElement>(null);
  let rowsCount = 0;

  useEffect(() => {
    if (containerRef.current) {
      rowsCount = Math.floor((containerRef.current.clientHeight) / 100);
      let count = 0;
      const result = [];
      for(let i = 0; i <= rowsCount; i++) {
        if (count >= images.length) {
          count = 0;
        }
        result.push(images[count]);
        ++count;
      }
      setImgList(result);
    }
  },[]);

  return (
    <>
    <div ref={containerRef} className='kids-wallpapper'>
      {imgList.map((item, index) => {
        return (
          <WallpapperImage
            borderlineRef={boyRef} 
            containerRef={containerRef}
            src={item} 
            key={'wallpapper-' + index}
          />
        )
      })}
    </div>
    <div ref={boyRef} className="kids-wallpapper__row last">
      <Image src={boy} alt=""/>
    </div>
    </>
  );
};

export default KidsWallpapper;