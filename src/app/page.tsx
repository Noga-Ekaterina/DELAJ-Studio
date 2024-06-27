import dynamic from "next/dynamic";

// Components
import MainScreen from "@/components/main-screen/MainScreen"
import ForAdult from "@/components/_sections/for-adult/ForAdult";
import ForKids from "@/components/_sections/for-kids/ForKids";
import SectionWrap from "@/components/section-wrap/SectionWrap";
import Landings from "@/components/_sections/_landings/Landings";
import { ISection } from "@/types";
import Scroller from "@/components/scroller/Scroller";

const sections: ISection[] = [
  {id: 'menu', Component: dynamic(() => import('@/components/_sections/menu/Menu')), prevId: 'first-landing'},
  {id: 'about', Component: dynamic(() => import('@/components/_sections/about/About'))},
  {id: 'career', Component: dynamic(() => import('@/components/_sections/career/Career'))},
  {id: 'contacts', Component: dynamic(() => import('@/components/_sections/contacts/Contacts'))},
  {id: 'faq', Component: dynamic(() => import('@/components/_sections/faq/Faq'))},
  {id: 'ideas', Component: dynamic(() => import('@/components/_sections/ideas/Ideas')), nextId: 'main-screen'},
]

const Page = () => {


  return (
    <Scroller>
      <SectionWrap
        id="first-landing"
        prevId={null}
        nextId="menu"
        className="no-overflow"
      >
        <Landings first="kids"/>
      </SectionWrap>
        
      {/* <SectionWrap 
        id="second-landing"
        prevId="first-landing"
        nextId="menu"
        className="no-overflow"
      >
        <Landings first="adult"/>
      </SectionWrap> */}
      {sections.map((section, index) => {
        const { Component } = section;
        const prevId = section.prevId || sections[index - 1]?.id;
        const nextId = section.nextId || sections[index + 1]?.id || "";

        return (
          <SectionWrap 
            id={section.id} 
            nextId={nextId} 
            prevId={prevId} 
            key={section.id}
          >
            <Component {...section.props}/>
          </SectionWrap>
        );
      })}
      <MainScreen />
    </Scroller>
  )
}

export default Page;