'use client'
import store from '@/store/store';
import { IWithChildren } from '@/types';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const WithCurrentPage: FC<IWithChildren> = observer((props) => {
  const { currentPage } = store;

  if (!currentPage) return null;

  return (
    <>
      {props.children}  
    </>
  );
});

export default WithCurrentPage;