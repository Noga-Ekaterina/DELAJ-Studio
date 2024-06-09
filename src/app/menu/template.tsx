import { circe } from '@/fonts';
import { IWithChildren } from '@/types';
import { FC } from 'react';
import cn from 'classnames';

const template: FC<IWithChildren> = ({ children }) => {
  return (
    <div className={cn('menu', circe.className)}>
      {children}
    </div>
  );
};

export default template;