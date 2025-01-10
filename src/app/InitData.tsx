'use client'
import React, {useEffect} from 'react';
import {IData} from "@/typesData";
import {IWithChildren} from "@/types";

interface Props extends IWithChildren{
  data: IData
}

const InitData = ({children, data}:Props) => {
  useEffect(() => {
    console.log(data)
  }, [data]);

  return (
      <>
        {children}
      </>
  );
};

export default InitData;
