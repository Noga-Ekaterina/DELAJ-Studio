'use client'
import React, {useEffect, useState} from 'react';
import "./project.scss"
import classNames from "classnames";
import {circe, halvar} from "@/fonts";
import {observer} from "mobx-react-lite";
import ProjectVideo from "@/components/project-video/ProjectVideo";
import {IProject, IProjectsList} from "@/typesData";
import {useLocale} from "@/components/_hooks/useLocale";
import store from "@/store/store";

interface Props {
  id: string,
  type: string
  project?: IProject|null| false
  files: string[]
}

const Project = ({id, type, project, files}: Props) => {
  const {isShowContent}=store
  const locale=useLocale()

  return (
      <div
          className="container"
          style={{opacity: isShowContent?1:0}}
      >

        {
          (project)
              ? (
                  <>
                    <div className="project-cover-wrapp">
                      <img
                          className='project-cover'
                          src={`/Assets/Projects/${type[0].toUpperCase() + type.slice(1)}/Project-${id}/preview-big.png`}
                          alt=""
                          loading="lazy"
                      />
                    </div>

                    <div className={classNames('project-data', circe.className)}>
                      <h1 className={halvar.className}>{project.data.title[locale]}</h1>
                      <div className="project-type">{project.data.type[locale]}</div>
                      <div className="project-data__bottom">
                        <ul className='project-params'>
                          {
                            project.data.parameters.map((parameter, index) => (
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
                      {Array.isArray(files) && files.map((file, index) => {
                        const dir=`/Assets/Projects/${type[0].toUpperCase() + type.slice(1)}/Project-${id}/Content/`
                        const src = `${dir}${file}`;

                        if (file.includes("preview")) return

                        if (file.endsWith('.mp4')) {
                          const preview =files.find(item=> item.includes(file.replace(".mp4", "-preview")))
                          return (
                              <ProjectVideo src={src} preview={preview&&`${dir}${preview}`} key={'project-material' + index}/>
                          )
                        }

                        return (
                            <img src={src} alt="" loading="lazy" key={'project-material' + index}/>
                        );
                      })}
                    </div>
                  </>
              )
              : <h1 className={halvar.className}>Проект не найден</h1>
        }
      </div>
  );
};

export default observer(Project);
