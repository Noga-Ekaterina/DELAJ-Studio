'use client';
import { FC, useEffect, useRef } from "react";
import store from "@/store/store";
import { Transition } from 'react-transition-group';
import { IWithChildren, IWithClass } from "@/types";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";

interface Props {
  styles : {
    defaultStyles: Record<string, string>,
    onOpen : Record<string, {translate: string, width?: string}>
    onCurrentPage: Record<string, {translate: string, width?: string}>
  }
  path: string
  Component: FC<IWithClass>
}

const PageMenuSide: FC<Props> = observer(({path, styles, Component}) => {
  const { isMenuOpened, changeMenuOpened } = store;
  const ref = useRef(null);

  const currentPath = usePathname();
  const isThisPath = currentPath.includes(path);
  const styleToggle = isThisPath ? 'onCurrentPage' : 'onOpen' ;

  useEffect(() => {
    if (isThisPath) {
      changeMenuOpened(false);
    }
  },[isThisPath])

  return (
    <Transition nodeRef={ref} in={isMenuOpened || isThisPath} timeout={300}>
      {state => (
        <div 
          className="page-menu__screen" 
          ref={ref}
          style={{
            ...styles.defaultStyles, 
            ...styles[styleToggle][state],
          }}
        >
          <Component className={isThisPath ? 'opened' : ''}/>
        </div>
      )}
    </Transition>
  );
});

export default PageMenuSide;