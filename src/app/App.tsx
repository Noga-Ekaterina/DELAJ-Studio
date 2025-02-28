'use client'

import React, {useEffect, useState} from 'react';
import {IWithChildren} from "@/types";
import Header from "@/components/header/Header";
import SmoothScrolling from "@/app/SmoothScrolling";
import ModalMenu from "@/components/_modals/modal-menu/ModalMenu";
import ModalContacts from "@/components/_modals/modal-contacts/ModalContacts";
import store from "@/store/store";
import general from "@/store/text/general";
import {observer} from "mobx-react-lite";
import projects from "@/store/text/Projects";
import career from "@/store/text/career";
import {useIsHome} from "@/components/_hooks/useIsHome";
import {usePathname, useRouter} from "next/navigation";
import {useHash} from "@/components/_hooks/useHash";
import {useLenis} from "@studio-freight/react-lenis";
import {useLocale} from "@/components/_hooks/useLocale";

const App = ({children}:IWithChildren) => {
  const [vh, setVh] = useState(0)
  const {togleScroll, isLandingSwiped, changePrevHash, chhangeIsShowContent}=store
  const {setGeneral, menuSectionTitle}= general
  const {projectsList, setProjectsList}=projects
  const {careerList, setAllCareer}=career
  const isHome=useIsHome()
  const pathname=usePathname()
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
    //setGeneral()

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

    chhangeIsShowContent()
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [vh]);

  useEffect(() => {
    changePrevHash(currentHash)
    setCurrentHash(hash)
  }, [hash, isHome]);


  return (
      <>
        <Header/>
        {children}
        <ModalMenu/>
        <ModalContacts/>
      </>
  );
};

export default observer(App);
