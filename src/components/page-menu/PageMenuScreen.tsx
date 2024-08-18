'use client';
import { FC, memo, useEffect, useRef } from "react";
import store from "@/store/store";
import { Transition } from 'react-transition-group';
import { observer } from "mobx-react-lite";
import { CurrentPageType } from "@/types";
import { transitionStyles } from "@/vars";
import classNames from "classnames";
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
  // hidden: boolean
}

const PageMenuSide: FC<Props> = observer(({Component, ...props}) => {
  const { 
    isMenuLandingsOpened,
    changeMenuOpened, 
    currentPage, 
    changeCurrentPage 
  } = store;
  const ref = useRef(null);
  const isThisPath = currentPage === props.page;
  const styleToggle = isThisPath ? 'onCurrentPage' : 'onOpen' ;

  const chooseLanding = () => {
    changeCurrentPage(props.page);
    props.handleClick();
  }

  const swipeScreenUp = () => {
    if (isThisPath && window) {
      window.location.hash = 'first-landing';
    }
  }

  useEffect(() => {
    if (isThisPath) {
      changeMenuOpened(false);
    }
  }, [isThisPath, changeMenuOpened])

  return (
    <Transition nodeRef={ref} in={isMenuLandingsOpened || isThisPath} timeout={0}>
      {state => (
        <div 
          className={classNames("page-menu__screen", isThisPath ? 'opened' : '')} 
          ref={ref}
          onClick={chooseLanding}
          onWheel={swipeScreenUp}
          onTouchMove={swipeScreenUp}
          style={{
            ...props.styles.defaultStyles, 
            ...props.styles[styleToggle][state],
            ...transitionStyles,
            // display: !isMenuLandingsOpened? "none":""
          }}
        >
          <Component isOpened={isThisPath}/>
        </div>
      )}
    </Transition>
  );
});

export default PageMenuSide;