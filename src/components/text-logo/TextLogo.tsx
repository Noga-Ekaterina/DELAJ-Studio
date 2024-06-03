import { FC } from 'react';
import { halvar } from '@/fonts';
import cn from 'classnames';
import { IWithClass } from '@/types';
import './text-logo.scss';

const TextLogo: FC<IWithClass> = (props) => {
  const className = cn(
    'text-logo', 
    halvar.className,
    props.className || ''
  );

  return (
    <p className={className}>animation studio</p>
  );
};

export default TextLogo;