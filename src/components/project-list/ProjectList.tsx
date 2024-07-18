'use client'
import { FC, ReactNode, useEffect, useState } from 'react';
import './project-list.scss';

import Link from 'next/link';
import Image from 'next/image';
import { IWithClass, ProjectItem } from '@/types';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';

interface Props extends IWithClass{
  title: string
  Wallpapper?: FC
}

const ProjectList: FC<Props> = ({ title, className, Wallpapper }) => {
  const [data, setData] = useState<ProjectItem[]>([]);
  const [baseChunkSize, setBaseChunkSize] = useState(3);
  const mobileScreen = useMediaQuery({maxWidth: 768});

  const getModifiedList = (data: any[]) => {
    if (data.length > 3){ 
      let result: any[] = [];
      let chunkSize = baseChunkSize;
      let index = 0;

      const increase = (newChunkSizeValue: number) => {
        const subArray = data.slice(index, index + chunkSize); 

        if (subArray.length <= 1) {
          let last = result.length - 1;
          result[last] = result[last].concat(subArray);
        } else {
          result.push(subArray);
        }
        index += chunkSize;
        chunkSize = newChunkSizeValue;
      }

      while (index < data.length) { 
        if (chunkSize === baseChunkSize) {
          increase(chunkSize - 1);
        } else {
          increase(baseChunkSize);
        }
      }
    
      return result;

    } else {
      return data;
    }
  };

  const itemsGrid = getModifiedList(data);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/projects/${title}`);
      const json = await response.json();

      setData(json);
    })();
  },[])

  useEffect(() => {
    console.log(itemsGrid)
    if (mobileScreen) {
      setBaseChunkSize(2);
    } else {
      setBaseChunkSize(3);
    }
  },[mobileScreen])

  return (
    <div className={cn(className, "project-list")}>
      <div className="container">

        {itemsGrid.map((row, index) => {
          const rowClass = cn(
            "project-list__row",
            (row.length !== baseChunkSize) && 'large',
          )

          return (
            <div className={rowClass} key={'project-list-row' + index}>

              {row.map((item: ProjectItem, index: number) => {
                return (
                  <Link 
                    href={`projects/${item.href}`} 
                    className='project-list__item' 
                    key={item.id + index}>
                    <Image 
                      src={item.preview} 
                      key={'project-list-' + item.id} 
                      width={400}
                      height={200}
                      quality={100}
                      alt="" 
                    />
                  </Link>
                );
              })}

            </div>
          )
        })}

        {Wallpapper && data.length && <Wallpapper />}
      </div>
    </div>
  );
};

export default ProjectList;
