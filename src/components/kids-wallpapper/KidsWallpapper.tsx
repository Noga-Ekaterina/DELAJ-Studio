'use client';
import { FC, useEffect, useRef, useState } from 'react';
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
import { IWithClass } from '@/types';
import cn from 'classnames';
import getBreakpoint from '@/utils/getBreakpoint';

const images = [
  fst, scd, thr, frt, fvt, sxt, svn, egh, nin,
]

interface WallpapperImageProps extends IWithClass{
  src: StaticImageData
  height?: number 
} 

const WallpapperImage: FC<WallpapperImageProps> = (props) => {
  const height = props.height && props.height * 0.7;

  return (
    <div className={cn("kids-wallpapper__row", props.className)}>
      <Image style={{height: height + 'rem'}} src={props.src} alt=''/>
    </div>
  );
}

const KidsWallpapper: FC = () => {
  const [imgList, setImgList] = useState<StaticImageData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  let rowsCount = 0;
  const rowHeight = 200;

  useEffect(() => {
    if (containerRef.current) {
      rowsCount = Math.floor((containerRef.current.clientHeight) / rowHeight);

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
        const data = (index + 1 === imgList.length) 
        ? {src: boy} 
        : {src: item, height: rowHeight};
        const className = (index + 1 === imgList.length - 1) ? 'pre-last' : '';
        
        return (
          <WallpapperImage
            src={data.src}
            height={data.height}
            className={className}
            key={'wallpapper-' + index}
          />
        )
      })}
    </div>
    </>
  );
};

export default KidsWallpapper;