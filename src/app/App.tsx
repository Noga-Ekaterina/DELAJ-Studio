'use client'

import React, {useEffect, useState} from 'react';
import {IWithChildren} from "@/types";
import Header from "@/components/header/Header";
import SmoothScrolling from "@/app/SmoothScrolling";
import ModalMenu from "@/components/_modals/modal-menu/ModalMenu";
import ModalContacts from "@/components/_modals/modal-contacts/ModalContacts";
import store from "@/store/store";
import general from "@/store/text/general";
import {useLoad} from "@/components/_hooks/useLoad";
import {observer} from "mobx-react-lite";
import homeText from "@/store/text/home";
import projects from "@/store/text/Projects";
import career from "@/store/text/career";
import {useIsHome} from "@/components/_hooks/useIsHome";
import {usePathname, useRouter} from "next/navigation";
import {useHash} from "@/components/_hooks/useHash";
import {useLenis} from "@studio-freight/react-lenis";
import Outline from "@/components/outline/Outline";
import {useLocale} from "@/components/_hooks/useLocale";
import {IProjectsList, ILadings} from "@/typesData";

const App = ({children}:IWithChildren) => {
  const [vh, setVh] = useState(0)
  const {togleScroll, isLandingSwiped, changePrevHash}=store
  const {fetchGeneral, menuSectionTitle}= general
  const {fetchAll, landingsText}=homeText
  const {projectsList, fetchProjectsList}=projects
  const {careerList, fetchAllCareer}=career
  const isHome=useIsHome()
  const pathname=usePathname()
  const isload= useLoad()
  const hash=useHash()
  const [currentHash, setCurrentHash] = useState('');
  const lenis=useLenis()
  const {isScrollOn}=store
  const locale=useLocale()
  const title= locale==="ru"? "ДЕЛАЙ":"DELAI"

  useEffect(() => {
    if (lenis){
      if (isScrollOn)
        lenis.start()
      else
        lenis.stop()
    }
  }, [isScrollOn]);

  useEffect(() => {
    fetchGeneral()

    if (isHome && (hash=="" || hash=="main-screen")) {
      document.documentElement.style.overflow = "hidden"
      togleScroll(false)
    }

    if (window){
      setVh(window.innerHeight/100)

      window.addEventListener("resize", ()=>{
        setVh(window.innerHeight/100)
      })
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [vh]);

  useEffect(() => {
    changePrevHash(currentHash)
    setCurrentHash(hash)

    if (isHome && isload)
      fetchAll()

    if (!projectsList && (isHome || pathname.includes("projects")))
      fetchProjectsList()

    if (!careerList && (isHome || pathname.includes("career")))
      fetchAllCareer()
  }, [hash, isHome]);

  useEffect(() => {
    if (isHome) {
      if (hash === "" || hash === "main-screen" || !menuSectionTitle) {
        document.title = title;
      } else {
        const key = hash.replace(/-(.)/, (match, group1) => group1.toUpperCase());
        console.log(key);
        if (key in menuSectionTitle) {
          document.title = `${title} | ${menuSectionTitle[key as keyof typeof menuSectionTitle][locale].toUpperCase()}`;
        }
        else{
          if (!landingsText) return

          if (hash=="first-landing"){
            const type= isLandingSwiped? "adult":'kids'
            document.title = `${title} | ${landingsText[type as keyof typeof landingsText].title[locale].toUpperCase()}`;
          } else if (hash=="second-landing"){
            const type= !isLandingSwiped? "adult":'kids'
            document.title = `${title} | ${landingsText[type as keyof typeof landingsText].title[locale].toUpperCase()}`;
          }
        }
      }
    }else  if(pathname.includes('career')){
      if (careerList){
        const [id ]= Array.from(pathname
        .matchAll(/([^\/]*)\/$/g)).map(m => m[1].trim());

        console.log(id)
        const item= careerList.find(item=> String(item.id)==id)

        if (item){
          document.title=`${title} | ${item.data.title[locale].toUpperCase()}`
        }
      }
    }else  if(pathname.includes('projects')){
      if (projectsList){
        const [data]= Array.from(pathname
            .matchAll(/([^\/]*)\/([^\/]*)\/$/g)).map(m => m);
        const [str, type, id ]=data

        console.log({type, id})
        if (projectsList[(type as keyof IProjectsList)]){
          const item= projectsList[type as keyof IProjectsList]?.find(item=> String(item.id)==id)

          if (item){
            document.title=`${title} | ${item.data.title[locale].toUpperCase()}`
          }
        }
      }
    }
  }, [isHome, hash, menuSectionTitle, title, locale, pathname]);


  return (
      <>
        {(!isload || !isHome) && <Header/>}
        {children}
        <ModalMenu/>
        <ModalContacts/>
      </>
  );
};

export default observer(App);
