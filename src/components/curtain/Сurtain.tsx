'use client'
import {FC, useEffect, useRef, useState} from "react";
import "./curtain.scss"
import store from "@/store/store";
import { observer } from 'mobx-react-lite';
import {useHash} from "@/components/_hooks/useHash";
import {Transition} from "react-transition-group";
import {transitionStyles} from "@/vars";
import cn from 'classnames';
import {IWithChildren} from "@/types";

const curtainStyles = {
  unmounted: { top: "0%",},
  entering: { top: "0%",},
  entered: { top: "0%",},
  exiting:  {  top: "calc(-100* var(--vh))",},
  exited:  {  top: "calc(-100* var(--vh))",},
};

interface CurtainProps extends IWithChildren{
  show: boolean,
  zIndex?: number,
  className?: string
}

const Curtain: FC<CurtainProps> = ({children, show, zIndex, className}) => {
  const {
    isMenuLandingsOpened,
    changeMenuOpened,
    changeCurrentPage,
    currentPage
  } = store;
  const hash = useHash();
  const [hidden, setHidden] = useState(false)


  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (show){
      setHidden(false)
    } else{
      timer= setTimeout(()=>{
        setHidden(true)
      },700)
    }

    return ()=>{
      clearTimeout(timer)
      setHidden(false)
    }
  },[show])

  return (
      <Transition in={show} timeout={0}>
        {state => (
            <>
              <div
                  className={cn("curtain", className)}
                  style={{
                    ...transitionStyles,
                    ...curtainStyles[state],
                    zIndex: hidden ? -1 : zIndex? zIndex: 5
                  }}
              >
                {children}
              </div>
            </>
        )}
      </Transition>
  );
};

export default observer(Curtain)