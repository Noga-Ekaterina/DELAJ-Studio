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
};

interface LanguageToggleProps extends IWithClass{
  style?: CSSProperties
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
        router.push(`/${lang}${pathname}#${hash}`)
      }else {
        router.push(`${pathname.replace(locale, lang)}#${hash}`)
      }
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale)
  }, [locale]);

  return (
    <button 
      className={className} 
      onClick={() => changeLangauge(props.lang)}
    >
      {props.lang}
    </button>
  );
};

const LanguageToggle: FC<LanguageToggleProps> = (props) => {
  const className = cn('language-toggle', props.className);

  return (
    <div className={className} style={props.style}>
      <LanguageToggleSpan lang='ru'/>
      <span>/</span>
      <LanguageToggleSpan lang='en'/>
    </div>
  );
};

export default LanguageToggle;
