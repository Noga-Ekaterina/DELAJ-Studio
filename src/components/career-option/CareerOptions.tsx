import React, { FC } from 'react';
import './career-option.scss';
import { CareerOptionType, IWithClass } from '@/types';
import classNames from 'classnames';

interface Props extends IWithClass {
  type: CareerOptionType
}

const CareerOption: FC<Props> = (props) => {
  const className = classNames(
    props.className, 
    'options-item',
    props.type === 'Закрытая' && 'closed',
    props.type === 'Открытая' && 'opened'
  );

  return (
    <div className={className}>
      {props.type}
    </div>
  );
};

export default CareerOption;