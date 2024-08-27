import React, {FC} from 'react';
import career from "@/store/text/career";
import cn from "classnames";
import {circe} from "@/fonts";
import BreadCrumbs from "@/components/bread-crumbs/BreadCrumbs";
import Image from "next/image";
import close from "../../../../../public/images/close.svg";
import CareerOption from "@/components/_career/career-option/CareerOptions";
import CareerSlider from "@/components/_career/career-slder/CareerSlider";
import CareerItemForm from "@/components/_career/career-form/CareerForm";
import {LangType} from "@/types";
import CareerPage from "@/components/_career/career-page/CareerPage";

interface Props {
  params: {
    id: string
  }
}
const Page:FC<Props> = ({params}) => {
  const {id} =params

  return(
      <CareerPage id={Number(id)}/>
  )
};

export default Page;
