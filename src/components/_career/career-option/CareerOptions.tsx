'use client'
import React, { FC } from 'react';
import './career-option.scss';
import { IWithClass } from '@/types';
import classNames from 'classnames';
import {useLocale} from "@/components/_hooks/useLocale";

interface Props extends IWithClass {
  type: string
}

const CareerOption: FC<Props> = (props) => {
  const locale=useLocale()
  const className = classNames(
    props.className, 
    'options-item',
    props.type
  );

  return (
    <div className={className}>
      {props.type==="opened"? locale==="ru"? "Открытая":"opened": props.type==="closed"? locale==="ru"? "Закрытая":"closed": props.type}
    </div>
  );
};


export default CareerOption;