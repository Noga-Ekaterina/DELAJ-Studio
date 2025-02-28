'use client';
import { FC, useEffect, useRef, useState } from "react";
import AdultScreen from "../adult-screen/AdultScreen";
import KidsScreen from "../kids-screen/KidsScreen";
import './page-menu.scss';
import PageMenuScreen from './PageMenuScreen';
import { transitionStyles } from "@/vars";
import { useMediaQuery } from "react-responsive";
import { observer } from "mobx-react-lite";
import store from "@/store/store";
import {useHash} from "@/components/_hooks/useHash";
import {useViewport} from "@/components/_hooks/useViewport";

const sideStyles = {
  largeScreen: {
    kids: {
      defaultStyles: {
        top: 0, 
        bottom: 0, 
        width: '50.1vw',
        left:"-50%" , 
      },
      onOpen : {
        entering: {width: '50.1vw', left: "0%"},
        entered: {width: '50.1vw', left: "0%"},
        exiting:  { width: '50.1vw', left: "-50.1%"},
        exited:  { width: '50.1vw', left: "-50.1%"},
      },
      onCurrentPage : {
        entering: {width: '100vw', left: "0%"},
        entered: {width: '100vw', left: "0%", flexShrink: 0},
        exiting:  { width: '50.1vw', left: "0%"},
        exited:  { width: '50.1vw', left: "0%"},
      },
    },
    adult: {
      defaultStyles: {
        top: 0,
        bottom: 0,
        width: '50.1vw',
        right:"-50%" , 
      },
      onOpen : {
        entering: {width: '50.1vw', right: "0%"},
        entered: {width: '50.1vw', right: "0%"},
        exiting:  { width: '50.1vw', right: "-50.1%"},
        exited:  { width: '50.1vw', right: "-50.1%" },
      },
      onCurrentPage : {
        entering: {width: '100vw', right: "0%"},
        entered: {width: '100vw', right: "0%", flexShrink: 0},
        exiting:  { width: '50.1vw', right: "0%"},
        exited:  { width: '50.1vw', right: "0%"},
      },
    }
  },
  mediumScreen: {
    kids: {
      defaultStyles: {
        right: 0,
        left: 0,
        height: 'calc(50* var(--vh))', 
        width: '100%',
        top: '-50%', 
      },
      onOpen : {
        entering: {height: 'calc(50* var(--vh))', top: "0%"},
        entered: {height: 'calc(50* var(--vh))', top: "0%"},
        exiting:  { height: 'calc(50* var(--vh))', top: "-50%"},
        exited:  { height: 'calc(50* var(--vh))', top: "-50%"},
      },
      onCurrentPage : {
        entering: { height: 'calc(100* var(--vh))', top: "0%"},
        entered: { height: 'calc(100* var(--vh))', top: "0%", flexShrink: 0},
        exiting:  { height: 'calc(50* var(--vh))', top: "0%"},
        exited:  { height: 'calc(50* var(--vh))', top: "0%"},
      },
    },
    adult: {
      defaultStyles: { 
        right: 0,
        left: 0,
        height: 'calc(50* var(--vh))', 
        width: '100%',
        bottom:"-50%" , 
      },
      onOpen : {
        entering: { height: 'calc(50* var(--vh))', bottom: "0%"},
        entered: { height: 'calc(50* var(--vh))', bottom: "0%"},
        exiting:  { height: 'calc(50* var(--vh))', bottom: "-50%"},
        exited:  { height: 'calc(50* var(--vh))', bottom: "-50%" },
      },
      onCurrentPage : {
        entering: { height: 'calc(100* var(--vh))', bottom: "0%"},
        entered: { height: 'calc(100* var(--vh))', bottom: "0%", flexShrink: 0},
        exiting:  { height: 'calc(50* var(--vh))', bottom: "0%"},
        exited:  { height: 'calc(50* var(--vh))', bottom: "0%"},
      },
    }
  }
}

type ScreenStylesType = 'mediumScreen' | 'largeScreen';

const PageMenu: FC = () => {
  const viewport= useViewport()
  const { isLandingSwiped,  swipeLanding} = store;
  const ref = useRef<HTMLDivElement>(null);
  const mediumScreen = useMediaQuery({maxWidth: 1024});
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [screenStyles, setScreenStyles] = useState<ScreenStylesType>('largeScreen');
  const hash= useHash()
  const [hidden, setHidden] = useState(true)

  const swipeToKids = () => {
    if (isLandingSwiped) {
      swipeLanding(false);
    }
  }

  const swipeToAdult = () => {
    if (!isLandingSwiped) {
      swipeLanding(true);
    }
  }

  useEffect(() => {
    setTimeout(()=>setHidden(false), 700)
  }, []);

  useEffect(() => {
    if (mediumScreen) {
      setScreenStyles((viewport>1.25 && !mobileScreen)?'largeScreen':'mediumScreen');
    } else {
      setScreenStyles(viewport>1.25 ?'largeScreen': 'mediumScreen');
    }
  },[mediumScreen, viewport])

  return (  
    <nav ref={ref} style={{opacity: hidden?0:1}} >
      <PageMenuScreen
        styles={sideStyles[screenStyles].kids}
        page="kids"
        Component={KidsScreen}
        handleClick={() => swipeToKids()}
        // hidden={hiden.kids}
      >
        
      </PageMenuScreen>
      <PageMenuScreen 
        styles={sideStyles[screenStyles].adult}
        page="adult"
        Component={AdultScreen}
        handleClick={() => swipeToAdult()}
        // hidden={hiden.adult}
      >
      </PageMenuScreen>
    </nav>
  );
};

export default observer(PageMenu);