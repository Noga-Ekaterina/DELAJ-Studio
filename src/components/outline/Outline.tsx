'use client'
import React, {useEffect, useState} from 'react';
import "./outline.scss"
import {sectionsMenuHashes} from "@/vars";
import {useHash} from "@/components/_hooks/useHash";
import {usePathname} from "next/navigation";

const Outline = () => {
  return (
      <>
      <div className="outline underlines">
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
