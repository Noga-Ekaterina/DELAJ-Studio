import { FC } from 'react';
import './project-list.scss';

import first from '../../../public/images/data/1.png';
import second from '../../../public/images/data/2.png';
import third from '../../../public/images/data/3.png';
import fourth from '../../../public/images/data/4.png';
import fifth from '../../../public/images/data/5.png';
import sixth from '../../../public/images/data/6.png';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectItem } from '@/types';

// export async function getStaticProps() {
//   const response = await fetch('http://localhost:3000/api/projects'); 
//   const data = response.json();

//   return {
//     props: { projects: data }
//   }
// }

const data: ProjectItem[] = [
  {id: 2, preview: first},
  {id: 2, preview: second},
  {id: 2, preview: third},
  {id: 2, preview: fourth},
  {id: 2, preview: fifth},
  {id: 2, preview: sixth},
]

const ProjectList: FC = () => {

  return (
    <div className='project-list'>
      {data.map(item => {
        return (
          <Link href={`/${item.id}`}>
            <Image src={item.preview} key={"project-list-" + item.id} alt=""/>
          </Link>
        )
      })}
    </div>
  );
};

export default ProjectList;