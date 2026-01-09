'use client'
import React from 'react';
import store from "@/store/store";
import {observer} from "mobx-react-lite";
import {halvar} from "@/fonts";
import BasicFooter from "@/components/_footers/basic-footer/BasicFooter";
import {useLocale} from "@/components/_hooks/useLocale";

const ProjectNotFound = () => {
  const {isShowContent}=store
  const locale=useLocale()

  return (
      <div className='project'>
        <div
            className="container"
            style={{opacity: isShowContent?1:0}}
        >
          <h1 className={halvar.className}>{locale=="ru"? "Проект не найден" :"Project not found"}</h1>
        </div>
        <BasicFooter/>
      </div>
  );
};

export default observer(ProjectNotFound);
