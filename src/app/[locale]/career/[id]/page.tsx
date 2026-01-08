import React, {FC} from 'react';
import CareerPage from "@/components/_career/career-page/CareerPage";
import {Metadata, ResolvingMetadata} from "next";
import {title} from "@/vars";
import {ICareer, ICareerPage} from "@/typesData";
import {fetchData} from "@/utils/fetchData";
import {LangType} from "@/types";

interface Props {
  params: {
    id: string
    locale: LangType
  }
}


export async function generateMetadata(
    { params}: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
  const {locale, id} = params
  const careerList: ICareer[] = await fetchData('Slides/Vacancy/data.json');
  const careerItem=careerList &&careerList.find(item=> item.id==Number(id))

  return {
    title: title[locale] +`${careerItem&&` | ${careerItem.data.title[locale]}`}`,
    description: careerItem? careerItem.data.description[locale]:''
  }
}


const init = async () => {
  const data: ICareerPage = {}

  const promises = [
    fetchData('Slides/Vacancy/data.json').then(result => data.careerList = result),
    fetchData('Slides/Vacancy/form.json').then(result => data.formText = result)
  ]

  await Promise.all(promises)

  return data
}


const Page:FC<Props> = async ({params}) => {
  const data= await init()
  const {id} =params

  return(
      <CareerPage careerList={data.careerList} formText={data.formText} id={Number(id)}/>
  )
};

export default Page;
