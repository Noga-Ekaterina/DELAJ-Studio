'use client'
import React, {useEffect} from 'react';
import {IData} from "@/typesData";
import {IWithChildren} from "@/types";
import career from "@/store/text/career";
import general from "@/store/text/general";

interface Props extends IWithChildren{
  data: IData
}

const InitData = ({children, data}:Props) => {
  const {setGeneral}=general
  const {setAllCareer}=career
  useEffect(() => {
    setGeneral(data)
    setAllCareer(data)
  }, [data]);

  return (
      <>
        {children}
      </>
  );
};

export default InitData;
