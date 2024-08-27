'use client'
import React, {useEffect, useState} from 'react';
import "./outline.scss"
import {sectionsMenuHashes} from "@/vars";
import {useHash} from "@/components/_hooks/useHash";
import {usePathname} from "next/navigation";

const Outline = () => {
  const hash=useHash()
  const pathname=usePathname()
  const [lineStyles, setLineStyles] = useState('default');
  const isSectionMenu = sectionsMenuHashes.includes(hash) || hash === 'menu' || pathname.includes("career/");
  const getPureHash = () => {
    if (pathname.includes("career/"))
      return "career"
    else
      return hash
  }


  useEffect(() => {
    const pureHash = getPureHash();

    switch(pureHash) {
      case 'career': {
        setLineStyles('caree')
      }
    }
  },[hash])


  return (
      <>
      <div
          className="outline topline"
          style={{
            'career': {color: '#00C2FF'},
            'ideas': {color: "#8BE200"},
            'contacts': {color: '#007BAD'},
            'faq': {color: '#FF1267'},
            'about': {color: '#F12B00'}
          }[getPureHash()] || {display: 'none'}}
      ></div>
      <div
          className="outline underlines"
          style={{display: isSectionMenu ? 'flex' : 'none'}}
      >
        <div className="underlines-item blue"></div>
        <div className="underlines-item yellow"></div>
        <div className="underlines-item red"></div>
        <div className="underlines-item purple"></div>
      </div>
    </>
  )
  ;
};

export default Outline;
