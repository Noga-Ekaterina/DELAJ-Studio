'use client';
import {CSSProperties, FC, useEffect, useState} from 'react';
import {IWithClass, LangType} from '@/types';
import cn from 'classnames';
import './language-toggle.scss';
import {usePathname, useRouter} from "next/navigation";
import {useLocale} from "@/components/_hooks/useLocale";
import {useHash} from "@/components/_hooks/useHash";


type SpanProps = {
  lang: LangType
  element?: JSX.Element
};

interface LanguageToggleProps extends IWithClass{
  style?: CSSProperties
  elements?: JSX.Element[]
}

const LanguageToggleSpan: FC<SpanProps> = (props) => {
  const locale=useLocale()
  const pathname=usePathname()
  const hash=useHash()
  const className = cn(
    locale !== props.lang ? 'disabled' : ''
  );
  const router=useRouter()

  const changeLangauge = (lang:LangType) => {
    if (lang!=locale){
      if (locale=="en"){
        router.replace(`/${lang}${pathname}#${hash}`)
      }else {
        router.replace(`${pathname.replace(locale, lang)}#${hash}`)
      }
    }
  }

  return (
    <button 
      className={className} 
      onClick={() => changeLangauge(props.lang)}
    >
      {props.element ?? props.lang}
    </button>
  );
};

const LanguageToggle: FC<LanguageToggleProps> = (props) => {
  const className = cn('language-toggle', props.className);
  const [ru, beam, en]= props.elements || []

  return (
    <div className={className} style={props.style}>
      <LanguageToggleSpan lang='ru' element={ru}/>
      <span>{beam ?? <>/</>}</span>
      <LanguageToggleSpan lang='en' element={en}/>
    </div>
  );
};

export default LanguageToggle;
