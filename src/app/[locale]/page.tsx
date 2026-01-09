
// Components
import MainScreen from "@/components/main-screen/MainScreen"
import Section from "@/components/section/Section";
import Landings from "@/components/_sections/_landings/Landings";
import Scroller from "@/components/scroller/Scroller";
import Menu from "@/components/_sections/menu/Menu";
import About from "@/components/_sections/about/About";
import Career from "@/components/_sections/career/Career";
import Contacts from "@/components/_sections/contacts/Contacts";
import Faq from "@/components/_sections/faq/Faq";
import Ideas from "@/components/_sections/ideas/Ideas";
import LandingSwitchButtonsGrup from "@/components/landing-switch-button/LandingSwitchButtonsGrup";
import React from "react";
import {fetchData} from "@/utils/fetchData";
import {IData} from "@/typesData";
import InitData from "@/app/InitData";
import {Metadata, ResolvingMetadata} from "next";
import {locales, title} from "@/vars";
import {LangType} from "@/types";
import ModalContacts from "@/components/_modals/modal-contacts/ModalContacts";
import { notFound } from 'next/navigation';

type Props = {
  params: {locale: LangType }
}
export const revalidate = 120;

// Генерация статических параметров для главной
export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata(
    { params}: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
  const locale = params.locale


  return {
    title: title[locale],
    description: locale==="ru"? "Анимация — это наша жизнь. Наша команда занимается полным циклом производства анимационных коротких метров, полных метров и сериалов в 2D и 3D технике.":"Animation is our life. Our team is engaged in a full cycle of production of short animated films, animated feature films and series with 2D and 3D technology."
  }
}

const init = async () => {
  const data: IData = {}
  console.log("home")

  const promises = [
    fetchData('Slides/Animations/text.json').then(result => data.landingsText = result),
    fetchData('Slides/About/text.json').then(result => data.aboutText = result),
    fetchData('Slides/Ideas/text.json').then(result => data.ideasText = result),
    fetchData('Slides/Contacts/text.json').then(result => data.contactsText = result),
    fetchData('Slides/FAQ/data.json').then(result => data.faqText = result),
    fetchData('Slides/title.json').then(result => data.menuSectionTitle = result),
    fetchData('Footers.json').then(result => data.footers = result),
    fetchData('Slides/Vacancy/data.json').then(result => data.careerList = result),
    fetchData('Projects/data.json').then(result => data.projectsList = result)
  ]

  await Promise.all(promises)

  return data
}


const Page = async ({ params}: Props) => {
  const data=await init()

  if (!locales.includes(params.locale as any)) {
    notFound();
  }

  return (
    <InitData data={data}>
      <Scroller>
        <Section id="empty-place"/>
        <Section id="first-landing">
          <Landings direction="left" landings={data.landingsText} projectsList={data.projectsList}/>
        </Section>

        <Section id="second-landing">
          <Landings direction="right" landings={data.landingsText} projectsList={data.projectsList}/>
        </Section>

        <Section id="menu">
          <Menu />
        </Section>

        <Section id="about">
          <About aboutText={data.aboutText} menuSectionTitle={data.menuSectionTitle}/>
        </Section>

        <Section id="career">
          <Career menuSectionTitle={data.menuSectionTitle} careerList={data.careerList}/>
        </Section>

        <Section id="contacts">
          <Contacts menuSectionTitle={data.menuSectionTitle} contactsText={data.contactsText}/>
        </Section>

        <Section id="faq">
          <Faq menuSectionTitle={data.menuSectionTitle} faqText={data.faqText}/>
        </Section>

        <Section id="ideas">
          <Ideas menuSectionTitle={data.menuSectionTitle} ideasText={data.ideasText} projectsList={data.projectsList}/>
        </Section>

      </Scroller>
      <MainScreen />
      <LandingSwitchButtonsGrup/>
      <ModalContacts menuSectionTitle={data.menuSectionTitle} contactsText={data.contactsText}/>
    </InitData>
  )
}

export default Page;