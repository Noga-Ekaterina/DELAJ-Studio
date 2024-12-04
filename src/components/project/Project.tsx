'use client'
import React, {useEffect, useState} from 'react';
import "./project.scss"
import classNames from "classnames";
import {circe, halvar} from "@/fonts";
import projects from "@/store/text/Projects";
import {observer} from "mobx-react-lite";
import ProjectVideo from "@/components/project-video/ProjectVideo";
import {IProject, IProjectsList} from "@/typesData";
import {useLocale} from "@/components/_hooks/useLocale";
import store from "@/store/store";

interface Props {
  id: string,
  type: string
}

const Project = ({id, type}: Props) => {
  const {isShowContent}=store
  const locale=useLocale()
  const {projectsList} =projects
  const project: undefined | null | false | IProject= (projectsList && (type=="kids" || type=="adults"))&& projectsList[type as keyof IProjectsList]?.find(item=> String(item.id)==id);
  // const files: string[] = fs.readdirSync(`/Assets/Projects/${type[0].toUpperCase() + type.slice(1)}/Project-${id}/Content/`).sort(
  //   (a: string, b: string) => {
  //     const aNum = +a.slice(0, a.indexOf('.'));
  //     const bNum = +b.slice(0, b.indexOf('.'));
  //     return (aNum > bNum) ? 1 : -1
  //   }
  // );

  const [files, setFiles] = useState<string[]>([])

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/projects/files?id=${id}&type=${type}`);
      const json = await response.json();

      setFiles(json);
    })();
  },[])
  console.log(files)
  return (
      <div className="container">
        {
          (project && isShowContent)
              ? (
                  <>
                    <div className="project-cover-wrapp">
                      <img
                          className='project-cover'
                          src={`/Assets/Projects/${type[0].toUpperCase() + type.slice(1)}/Project-${id}/preview-big.png`}
                          alt=""
                      />
                    </div>

                    <div className={classNames('project-data', circe.className)}>
                      <h1 className={halvar.className}>{project.data.title[locale]}</h1>
                      <div className="project-type">{project.data.type[locale]}</div>
                      <div className="project-data__bottom">
                        <ul className='project-params'>
                          {
                            project.data.parameters.map((parameter, index)=>(
                                <li key={`project-parameter-${index}`}>
                                  <span className="project-params__title">{parameter.title[locale]}</span>
                                  <span>{parameter.value[locale]}</span>
                                </li>
                            ))
                          }
                        </ul>
                        <p className='project-description'>{project.data.description[locale]}</p>
                      </div>
                    </div>
                    <div className="project-materials">
                {Array.isArray(files)&& files.map((file, index) => {
                  const src = `/Assets/Projects/${type[0].toUpperCase() + type.slice(1)}/Project-${id}/Content/${file}`;

                  if (file.endsWith('.mp4')) {
                    return (
                      <ProjectVideo src={src} key={'project-material' + index}/>
                    )
                  }

                  return (
                    <img src={src} alt=""  loading="lazy" key={'project-material' + index}/>
                  );
                }) }
              </div>
                  </>
              )
              : <h1 className={halvar.className}>Проект не найден</h1>
        }
      </div>
  );
};

export default observer(Project);
