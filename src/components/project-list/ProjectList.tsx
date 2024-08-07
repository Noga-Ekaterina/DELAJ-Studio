'use client'
import { FC, ReactNode, useEffect, useState } from 'react';
import './project-list.scss';

import Link from 'next/link';
import Image from 'next/image';
import { IWithClass, ProjectItem } from '@/types';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import {getShuffleArray} from "@/utils/getShuffleArray";

interface Props extends IWithClass{
  title: string
  Wallpapper?: FC
}

const ProjectList: FC<Props> = ({ title, className, Wallpapper }) => {
  const [data, setData] = useState<ProjectItem[]>([]);
  const [baseChunkSize, setBaseChunkSize] = useState(3);
  const mobileScreen = useMediaQuery({maxWidth: 640});
  const [isBigItem, setIsBigItem] = useState(false)

  const getModifiedList = (data: any[]) => {
    const chunkSizes = [baseChunkSize, baseChunkSize-1]; // Чередование размеров порций
    let result: any[] = [];
    let index = 0;
    let chunkIndex = 0;
    console.log(data)

    while (index < data.length) {
      const currentChunkSize = chunkSizes[chunkIndex % chunkSizes.length];
      const subArray = data.slice(index, index + currentChunkSize);


      if (subArray.length > 0) {
        // Добавляем новую порцию
        result.push(subArray);
      }

      index += currentChunkSize;
      chunkIndex++;
    }

    // Если result не пустой, проверяем последнюю порцию на предмет недостающих элементов
    if (result.length > 0) {
      const lastChunk = result[result.length - 1];
      const needed =  (index-data.length)

      if (needed > 0) {
        const extraElements = data.slice(0, needed);
        lastChunk.push(...extraElements);
      }
    }

    console.log(result)

    return result;
  };

  const [itemsGrid, setItemsGrid] = useState<any[]>([]);

  useEffect(() => {
    const shuffleData = getShuffleArray([...data]);
    setItemsGrid(getModifiedList(shuffleData));
  }, [data, baseChunkSize]);


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

        {itemsGrid.map((row, rowIndex) => {
          const rowClass = cn(
            "project-list__row",
            (row.length !== baseChunkSize) && 'large',
          )

          return (
            <div className={rowClass}
                 key={`project-list-row-${rowIndex}`}>

              {row.map((item: ProjectItem, index: number) => {
                return (
                  <Link
                    href={`projects/${item.href}`}
                    className='project-list__item'

                    key={`project-list-item-${item.id}`}>
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
