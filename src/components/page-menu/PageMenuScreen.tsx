'use client';
import { FC, memo, useEffect, useRef } from "react";
import store from "@/store/store";
import { Transition } from 'react-transition-group';
import { observer } from "mobx-react-lite";
import { CurrentPageType } from "@/types";
import { transitionStyles } from "@/vars";
type StyleObject = Record<string, string | number>

interface Props {
  styles : {
    defaultStyles: StyleObject,
    onOpen : Record<string, StyleObject>
    onCurrentPage: Record<string, StyleObject>
  }
  page: CurrentPageType
  Component: FC<{isOpened: boolean}>
}

const PageMenuSide: FC<Props> = observer(({page, styles, Component}) => {
  const { 
    isMenuOpened, 
    changeMenuOpened, 
    currentPage, 
    changeCurrentPage 
  } = store;

  const ref = useRef(null);
  const isThisPath = currentPage === page;
  
  const redirectOnPage = () => {
    if (window) {
      changeCurrentPage(page);
      window.location.hash = 'first-landing'; 
    }
  }

  const styleToggle = isThisPath ? 'onCurrentPage' : 'onOpen' ;

  useEffect(() => {
    if (isThisPath) {
      changeMenuOpened(false);
    }
  }, [isThisPath, changeMenuOpened])

  return (
    <Transition nodeRef={ref} in={isMenuOpened || isThisPath} timeout={0}>
      {state => (
        <div 
          className="page-menu__screen" 
          ref={ref}
          onClick={redirectOnPage}
          style={{
            ...styles.defaultStyles, 
            ...styles[styleToggle][state],
            ...transitionStyles
          }}
        >
          <Component isOpened={isThisPath}/>
        </div>
      )}
    </Transition>
  );
});

export default PageMenuSide;