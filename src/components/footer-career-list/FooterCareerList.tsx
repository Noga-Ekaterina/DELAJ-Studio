import React from 'react';
import career from "@/store/text/career";
import {useLocale} from "@/components/_hooks/useLocale";
import Link from "next/link";

const FooterCareerList = () => {
  const locale=useLocale()
  const {careerList}=career

  if (!careerList)return <></>

  const smallCareerList=careerList.slice(0, 6)

  return (
      <ul>
        {
          smallCareerList.map(item=>(
              <li key={'career-link' + item.id}>
                <Link href={`career/${item.id}`}>{item.data.title[locale]}</Link>
              </li>
          ))
        }
      </ul>
  );
};

export default FooterCareerList;
