import { IProject } from '@/types';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import './project.scss';
import { circe, halvar } from '@/fonts';
import getDuration from '@/utils/getDuration';
import classNames from 'classnames';
import Image from 'next/image';
import ProjectVideo from '@/components/project-video/ProjectVideo';
import BasicFooter from '@/components/basic-footer/BasicFooter';

const fs = require('fs');
const path = require('path');

interface Props {
  params: {
    id: string
  }
}

const getData = async (id: string): Promise<IProject | null> => {
  const response: Response = await fetch(`http://localhost:3000/api/projects?id=${id}`,);
  if (response.ok) {
    const project = await response.json();
    return project.item;
  }

  return null;
};


const Page: FC<Props> = async ({ params }) => {
  const { id } = params;
  const project: IProject | null = await getData(id);
  const pathToMaterials = path.join(process.cwd(), 'public') + '/projects-materials/' + id; 
  const files: string[] = fs.readdirSync(pathToMaterials).sort(
    (a: string, b: string) => {
      const aNum = +a.slice(0, a.indexOf('.'));
      const bNum = +b.slice(0, b.indexOf('.'));
      return (aNum > bNum) ? 1 : -1
    }
  );

  return (
    <div className='project'>
      <div className="container">
        {
          (project)
            ? (
              <>
              <div className={classNames('project-data', circe.className)}>
                <h1 className={halvar.className}>{project.data.title}</h1>  
                <div className="project-type">{project.data.type}</div>
                <div className="project-data__bottom">
                <ul className='project-params'>
                  <li>
                    <span className='project-params__title'>
                      Дата релиза
                    </span>
                    <span>{project.data.date}</span>
                  </li>
                  <li>
                    <span className='project-params__title'>
                      Тип проекта
                    </span>
                    <span>{project.data.animation}</span>
                  </li>
                  <li>
                    <span className='project-params__title'>
                      Хронометраж
                    </span>
                    <span>
                      {getDuration(project.data.duration)}
                    </span>
                  </li>
                </ul>
                <p className='project-description'>{project.data.description}</p>
                </div>
              </div>
              <div className="project-materials">
                {files.map((file, index) => {
                  const src = '/projects-materials/' + id + '/' + file;
                  
                  if (file.endsWith('.mp4')) {
                    return (
                      <ProjectVideo src={src} key={'project-material' + index}/>
                    )
                  } 

                  return (
                    <Image src={src} alt="" key={'project-material' + index} width={1000} height={700}/>
                  );
                }) }
              </div>
              </>
            )
            : <h1 className={halvar.className}>Проект не найден</h1>
        }
      </div>
      <BasicFooter />
    </div>
  );
};

export default Page;