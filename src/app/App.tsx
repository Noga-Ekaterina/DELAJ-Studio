'use client'

import React, {useEffect, useState} from 'react';
import {IWithChildren} from "@/types";
import Header from "@/components/header/Header";
import SmoothScrolling from "@/app/SmoothScrolling";
import ModalMenu from "@/components/_modals/modal-menu/ModalMenu";
import ModalContacts from "@/components/_modals/modal-contacts/ModalContacts";
import store from "@/store/store";
import text from "@/store/text/menuSecton";
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

const App = ({children}:IWithChildren) => {
  const [vh, setVh] = useState(0)
  const {togleScroll, changePrevHash}=store
  const {fetchMenuSectionTitle}=text
  const {fetchAll}=homeText
  const {projectsList, fetchProjectsList}=projects
  const {careerList, fetchCareerList}=career
  const isHome=useIsHome()
  const pathname=usePathname()
  const isload= useLoad()
  const hash=useHash()
  const [currentHash, setCurrentHash] = useState('');
  const lenis=useLenis()
  const {isScrollOn}=store
  const isLoad=useLoad()

  useEffect(() => {
    if (lenis){
      if (isScrollOn)
        lenis.start()
      else
        lenis.stop()
    }
  }, [isScrollOn]);

  useEffect(() => {
    fetchMenuSectionTitle()

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
      fetchCareerList()
  }, [hash, isHome]);

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
