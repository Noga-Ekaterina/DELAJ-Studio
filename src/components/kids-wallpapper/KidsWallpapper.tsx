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

const images = [
  fst, scd, thr, frt, fvt, sxt, svn, egh, nin,
]

interface WallpapperImageProps extends IWithClass{
  src: StaticImageData
  height?: number 
} 

const WallpapperImage: FC<WallpapperImageProps> = (props) => {

  return (
    <div className={cn("kids-wallpapper__item", props.className)} >
      <Image src={props.src} alt='' style={{height: props.height? props.height + "rem" :""}}/>
    </div>
  );
}

const KidsWallpapper: FC = () => {
  const [imgList, setImgList] = useState<StaticImageData[][]>([[]]);
  const containerRef = useRef<HTMLDivElement>(null);
  let rowsCount = 0;
  const rowHeight = 200;

  useEffect(() => {
    if (containerRef.current) {
      rowsCount = Math.floor((containerRef.current.clientHeight) / rowHeight);

      // Перемешиваем массив изображений
      const shuffledImages = images.sort(() => Math.random() - 0.5);

      let count = 0;
      const result = [];
      for(let i = 0; i <= rowsCount; i++) {
        if (count >= shuffledImages.length) {
          count = 0;
        }
        result.push(shuffledImages[count]);
        ++count;
      }

      // Разделяем массив результатов на две части
      const firstHalf = result.slice(0, result.length / 2 - 1);
      const secondHalf = result.slice(result.length / 2);

      setImgList([firstHalf, secondHalf]);
    }
  }, []);
  console.log(imgList)


  return (
    <>
    <div ref={containerRef} className='kids-wallpapper'>
      {imgList.map((item, col) =>
          <div className={cn("kids-wallpapper__col", `kids-wallpapper__col--${col+1}`)} key={Date.now()}>
            {
              item.map((img, index)=>{
                const data = (index + 1 === item.length && col ==0)
                    ? {src: boy, height: 366}
                    : {src: img};
                const className = (index + 1 === imgList.length - 1) ? 'pre-last' : '';

                return (
                    <WallpapperImage
                        src={data.src}
                        height={data.height}
                        className={className}
                        key={'wallpapper-' + index}
                    />
                )
              })
            }
          </div>
      )}
    </div>
    </>
  );
};

export default KidsWallpapper;