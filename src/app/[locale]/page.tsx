
// Components
import MainScreen from "@/components/main-screen/MainScreen"
import ForAdult from "@/components/_sections/for-adult/ForAdult";
import ForKids from "@/components/_sections/for-kids/ForKids";
import Section from "@/components/section/Section";
import Landings from "@/components/_sections/_landings/Landings";
import { ISection } from "@/types";
import Scroller from "@/components/scroller/Scroller";
import Menu from "@/components/_sections/menu/Menu";
import About from "@/components/_sections/about/About";
import Career from "@/components/_sections/career/Career";
import Contacts from "@/components/_sections/contacts/Contacts";
import Faq from "@/components/_sections/faq/Faq";
import Ideas from "@/components/_sections/ideas/Ideas";
import KidsButton from "@/components/landing-switch-button/KidsButton";
import AdultButton from "@/components/landing-switch-button/AdultButton";
import LandingSwitchButtonsGrup from "@/components/landing-switch-button/LandingSwitchButtonsGrup";
import React from "react";
import App from "@/app/App";
import general from "@/store/text/general";
import homeText from "@/store/text/home";
import projects from "@/store/text/Projects";
import career from "@/store/text/career";
import {fetchData} from "@/utils/fetchData";
import {
  IAbout,
  ICareer,
  IContacts, IData,
  IFaq,
  IFooters,
  IIdeas,
  ILadings,
  IMenuSectionTitle,
  IProjectsList
} from "@/typesData";
import InitData from "@/app/InitData";



const init= async ()=>{
  const data: IData={}
  data.landingsText = await fetchData('Slides/Animations/text.json');
  data.aboutText = await fetchData('Slides/About/text.json');

  data.ideasText = await fetchData('Slides/Ideas/text.json');

  data.contactsText = await fetchData('Slides/Contacts/text.json');

  data.faqText = await fetchData('Slides/FAQ/data.json');

  data.menuSectionTitle = await fetchData('Slides/title.json');

  data.footers = await fetchData('Footers.json');

  data.careerList = await fetchData('Slides/Vacancy/data.json');

  data.projectsList = await fetchData('Projects/data.json');

  return data
}

const Page = async () => {
  const data=await init()
  return (
    <InitData data={data}>
    <Scroller>
      <Section id="empty-place"/>
      <Section id="first-landing">
        <Landings direction="left"/>
      </Section>

      <Section id="second-landing">
        <Landings direction="right"/>
      </Section>

      <Section id="menu">
        <Menu />
      </Section>

      <Section id="about">
        <About />
      </Section>

      <Section id="career">
        <Career />
      </Section>

      <Section id="contacts">
        <Contacts />
      </Section>

      <Section id="faq">
        <Faq />
      </Section>

      <Section id="ideas">
        <Ideas />
      </Section>

    </Scroller>
      <LandingSwitchButtonsGrup/>
    </InitData>
  )
}

export default Page;