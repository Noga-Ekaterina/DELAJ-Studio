import React, {FC} from 'react';
import CareerPage from "@/components/_career/career-page/CareerPage";
import {Metadata, ResolvingMetadata} from "next";
import {locales, title} from "@/vars";
import {ICareer, ICareerPage} from "@/typesData";
import {fetchData} from "@/utils/fetchData";
import {LangType} from "@/types";
import {notFound} from "next/navigation";

interface Props {
  params: {
    id: string
    locale: LangType
  }
}

export const revalidate = 120;

export async function generateStaticParams() {
  try {
    const careerList: ICareer[] = await fetchData('Slides/Vacancy/data.json');

    const params = [];

    // Генерируем для каждой локали
    for (const locale of locales) {
      for (const career of careerList) {
        params.push({
          locale,
          id: career.id.toString(),
        });
      }
    }

    return params;
  } catch (error) {
    console.error('Failed to generate static params for careers:', error);
    return []; // При ошибке генерируем пустой массив
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
  const careerList=data.careerList

  const careerItem=careerList &&careerList.find(item=> item.id.toString()==id)

  if (!careerItem || !locales.includes(params.locale as any)) notFound()


  return(
      <CareerPage careerList={data.careerList} formText={data.formText} id={Number(id)}/>
  )
};

export default Page;
