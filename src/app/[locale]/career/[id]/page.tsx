import React, {FC} from 'react';
import CareerPage from "@/components/_career/career-page/CareerPage";
import {Metadata, ResolvingMetadata} from "next";
import {title} from "@/vars";
import {ICareer, IData} from "@/typesData";
import {fetchData} from "@/utils/fetchData";
import {LangType} from "@/types";
import InitData from "@/app/InitData";

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
  const data: IData = {}

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
      <InitData data={data}>
        <CareerPage careerList={data.careerList} id={Number(id)}/>
      </InitData>
  )
};

export default Page;
