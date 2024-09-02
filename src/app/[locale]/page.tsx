import { createContext } from 'react';

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

const Page = () => {
  // const {i18n}= useTranslation()
  // console.log(i18n.language)
  return (
    <>
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
    <MainScreen />
    </>
  )
}

export default Page;