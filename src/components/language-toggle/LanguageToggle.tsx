'use client';
import { FC, useState } from 'react';
import { IWithClass } from '@/types';
import cn from 'classnames';
import './language-toggle.scss';

type langType = 'ru' | 'en';

type SpanProps = {
  currentLang: langType
  lang: langType
  handleClick: (lang: langType) => void
};

const LanguageToggleSpan: FC<SpanProps> = (props) => {
  const className = cn(
    props.currentLang !== props.lang ? 'disabled' : ''
  );
  return (
    <button 
      className={className} 
      onClick={() => props.handleClick(props.lang)}
    >
      {props.lang}
    </button>
  );
};

interface Props extends IWithClass {}

const LanguageToggle: FC<Props> = (props) => {
  const className = cn('language-toggle', props.className);
  const [currentLang, setCurrentlang] = useState<langType>('ru');

  return (
    <div className={className}>
      <LanguageToggleSpan lang='ru' currentLang={currentLang} handleClick={setCurrentlang} />
      <span>/</span>
      <LanguageToggleSpan lang='en' currentLang={currentLang} handleClick={setCurrentlang}/>
    </div>
  );
};

export default LanguageToggle;
