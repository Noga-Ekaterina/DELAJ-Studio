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

const images = [
  fst, scd, thr, frt, fvt, sxt, svn, egh, nin,
]

const KidsWallpapper: FC = () => {
  const [imgList, setImgList] = useState<StaticImageData[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  let rowsCount = 0;

  useEffect(() => {
    if (ref.current) {
      rowsCount = Math.floor((ref.current.clientHeight) / 100);
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
    <div ref={ref} className='kids-wallpapper'>

      {imgList.map((item, index) => {
        return (
          <div 
            className="kids-wallpapper__row" 
            key={'wallpapper-' + index}
          >
            <Image src={item} alt=''/>
          </div>
        )
      })}

    </div>
    <div className="kids-wallpapper__row last">
      <Image src={boy} alt=""/>
    </div>
    </>
  );
};

export default KidsWallpapper;