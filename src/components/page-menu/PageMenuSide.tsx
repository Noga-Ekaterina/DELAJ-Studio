'use client';
import { FC, useEffect, useRef } from "react";
import store from "@/store/store";
import { Transition } from 'react-transition-group';
import { IWithClass } from "@/types";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";

type StyleObject = Record<string, string | number>

interface Props {
  styles : {
    defaultStyles: StyleObject,
    onOpen : Record<string, StyleObject>
    onCurrentPage: Record<string, StyleObject>
  }
  path: string
  Component: FC<{isOpened: boolean}>
}

const PageMenuSide: FC<Props> = observer(({path, styles, Component}) => {
  const { isMenuOpened, changeMenuOpened } = store;
  const ref = useRef(null);

  const router = useRouter();
  const currentPath = usePathname();
  const isThisPath = currentPath.includes(path);
  const redirectOnPage = () => {
    if (!isThisPath) {
      router.push(path);
    }
  }

  const styleToggle = isThisPath ? 'onCurrentPage' : 'onOpen' ;

  useEffect(() => {
    if (isThisPath) {
      changeMenuOpened(false);
    }
  }, [isThisPath, changeMenuOpened])

  return (
    <Transition nodeRef={ref} in={isMenuOpened || isThisPath} timeout={300}>
      {state => (
        <div 
          className="page-menu__screen" 
          ref={ref}
          onClick={redirectOnPage}
          style={{
            ...styles.defaultStyles, 
            ...styles[styleToggle][state],
          }}
        >
          <Component isOpened={isThisPath}/>
        </div>
      )}
    </Transition>
  );
});

export default PageMenuSide;