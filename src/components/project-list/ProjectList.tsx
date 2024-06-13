import { FC } from 'react';
import './project-list.scss';

import Link from 'next/link';
import Image from 'next/image';
import { IWithClass, ProjectItem } from '@/types';
import cn from 'classnames';

interface Props extends IWithClass{
  data: ProjectItem[]
}

const ProjectList: FC<Props> = ({ data, className }) => {
  
  const getModifiedList = (data: any[]) => {
    let result: any[] = [];

    let chunkSize = 3;
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
      if (chunkSize === 3) {
        increase(2);
      } else {
        increase(2);
        increase(3);
      }
    }
  
    return result;
  };

  const itemsGrid = getModifiedList(data);

  return (
    <div className={cn(className, "project-list")}>
      <div className="container">

        {itemsGrid.map((row, index) => {
          const rowClass = cn(
            "project-list__row",
            (row.length !== 3) && 'large',
          )

          return (
            <div className={rowClass} key={'project-list-row' + index}>

              {row.map((item: ProjectItem, index: number) => {
                return (
                  <Link 
                    href={`/${item.id}`} 
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
      </div>
    </div>
  );
};

export default ProjectList;
