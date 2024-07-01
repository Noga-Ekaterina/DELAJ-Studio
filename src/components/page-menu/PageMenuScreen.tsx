'use client';
import { FC, memo, useEffect, useRef } from "react";
import store from "@/store/store";
import { Transition } from 'react-transition-group';
import { observer } from "mobx-react-lite";
import { CurrentPageType } from "@/types";
import { transitionStyles } from "@/vars";
import { useHash } from "@/utils/useHash";
type StyleObject = Record<string, string | number>

interface Props {
  styles : {
    defaultStyles: StyleObject,
    onOpen : Record<string, StyleObject>
    onCurrentPage: Record<string, StyleObject>
  }
  page: CurrentPageType
  Component: FC<{isOpened: boolean}>
  handleClick: () => void
}

const PageMenuSide: FC<Props> = observer(({Component, ...props}) => {
  const { 
    isMenuOpened, 
    changeMenuOpened, 
    currentPage, 
    changeCurrentPage 
  } = store;
  const ref = useRef(null);
  const isThisPath = currentPage === props.page;
  
  const redirectOnPage = () => {
    if (window) {
      changeCurrentPage(props.page);
      window.location.hash = 'first-landing'; 
      props.handleClick();
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
            ...props.styles.defaultStyles, 
            ...props.styles[styleToggle][state],
            ...transitionStyles,
          }}
        >
          <Component isOpened={isThisPath}/>
        </div>
      )}
    </Transition>
  );
});

export default PageMenuSide;