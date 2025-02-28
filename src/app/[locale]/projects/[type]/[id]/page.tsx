import { FC } from 'react';
import BasicFooter from '@/components/_footers/basic-footer/BasicFooter';
import Project from "@/components/project/Project";
import {IData, IProject, IProjectsList} from "@/typesData";
import {fetchData} from "@/utils/fetchData";
import {title} from "@/vars";
import {LangType} from "@/types";
import {Metadata, ResolvingMetadata} from "next";
import InitData from "@/app/InitData";

interface Props {
  params: {
    id: string,
    locale: LangType
    type: string
  }
}


const init = async (type: string, id: string) => {
  const data: IData = {}

  const promises = [
    fetchData('Slides/title.json').then(result => data.menuSectionTitle = result),
    fetchData('Footers.json').then(result => data.footers = result),
    fetchData('Projects/data.json').then(result => data.projectsList = result)
  ]

  await Promise.all(promises)

  const projectsList = data.projectsList

  const project: undefined | null | false | IProject = (projectsList && (type == "kids" || type == "adults")) && projectsList[type as keyof IProjectsList]?.find(item => String(item.id) == id);

  return { data, project }
}


export async function generateMetadata(
    { params, }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
  const { id, type, locale } = params;
  const projectsList: null|IProjectsList = await fetchData('Projects/data.json');
  const project: undefined | null | false | IProject=(projectsList && (type=="kids" || type=="adults"))&& projectsList[type as keyof IProjectsList]?.find(item=> String(item.id)==id);


  return {
    title: title[locale] +`${project&&` | ${project.data.title[locale]}`}`,
    description: project? project.data.description[locale]:''
  }
}

const Page: FC<Props> =async ({ params }:Props) => {
  const { id, type, locale } = params;
  const {data, project}=await init(type, id)

  return (
      <InitData data={data}>
        <div className='project'>
          <Project id={id} type={type} project={project}/>
          <BasicFooter/>
        </div>
      </InitData>
  );
};

export default Page;