import React from 'react';
import InitData from "@/app/InitData";
import ProjectNotFound from "@/components/project/ProjectNotFound";
import {IProject, IProjectsAndLayout, IProjectsList} from "@/typesData";
import {fetchData} from "@/utils/fetchData";

export const revalidate = 60*3

const init = async () => {
  const data: IProjectsAndLayout = {}

  const promises = [
    fetchData('Slides/title.json').then(result => data.menuSectionTitle = result),
    fetchData('Footers.json').then(result => data.footers = result),
  ]

  await Promise.all(promises)


  return data
}

const NotFound = async () => {
  const data = await init()

  return (
      <InitData data={data}>
        <ProjectNotFound/>
      </InitData>
  )
};

export default NotFound;