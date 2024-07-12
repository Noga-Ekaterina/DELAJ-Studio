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

const sideStyles = {
  largeScreen: {
    kids: {
      defaultStyles: {
        top: 0, 
        bottom: 0, 
        width: '50vw', 
        left:"-50%" , 
      },
      onOpen : {
        entering: {width: '50vw', left: "0%"},
        entered: {width: '50vw', left: "0%"},
        exiting:  { width: '50vw', left: "-50%"},
        exited:  { width: '50vw', left: "-50%"},
      },
      onCurrentPage : {
        entering: {width: '100vw', left: "0%"},
        entered: {width: '100vw', left: "0%", flexShrink: 0},
        exiting:  { width: '50vw', left: "0%"},
        exited:  { width: '50vw', left: "0%"},
      },
    },
    adult: {
      defaultStyles: {
        top: 0,
        bottom: 0,
        width: '50vw', 
        right:"-50%" , 
      },
      onOpen : {
        entering: {width: '50vw', right: "0%"},
        entered: {width: '50vw', right: "0%"},
        exiting:  { width: '50vw', right: "-50%"},
        exited:  { width: '50vw', right: "-50%" },
      },
      onCurrentPage : {
        entering: {width: '100vw', right: "0%"},
        entered: {width: '100vw', right: "0%", flexShrink: 0},
        exiting:  { width: '50vw', right: "0%"},
        exited:  { width: '50vw', right: "0%"},
      },
    }
  },
  mediumScreen: {
    kids: {
      defaultStyles: {
        right: 0,
        left: 0,
        height: '50vh', 
        width: '100%',
        top: '-50%', 
      },
      onOpen : {
        entering: {height: '50vh', top: "0%"},
        entered: {height: '50vh', top: "0%"},
        exiting:  { height: '50vh', top: "-50%"},
        exited:  { height: '50vh', top: "-50%"},
      },
      onCurrentPage : {
        entering: { height: '100vh', top: "0%"},
        entered: { height: '100vh', top: "0%", flexShrink: 0},
        exiting:  { height: '50vh', top: "0%"},
        exited:  { height: '50vh', top: "0%"},
      },
    },
    adult: {
      defaultStyles: { 
        right: 0,
        left: 0,
        height: '50vh', 
        width: '100%',
        bottom:"-50%" , 
      },
      onOpen : {
        entering: { height: '50vh', bottom: "0%"},
        entered: { height: '50vh', bottom: "0%"},
        exiting:  { height: '50vh', bottom: "-50%"},
        exited:  { height: '50vh', bottom: "-50%" },
      },
      onCurrentPage : {
        entering: { height: '100vh', bottom: "0%"},
        entered: { height: '100vh', bottom: "0%", flexShrink: 0},
        exiting:  { height: '50vh', bottom: "0%"},
        exited:  { height: '50vh', bottom: "0%"},
      },
    }
  }
}

type ScreenStylesType = 'mediumScreen' | 'largeScreen';

const PageMenu: FC = () => {
  const { isLandingSwiped,  swipeLanding} = store;
  const ref = useRef<HTMLDivElement>(null);
  const mediumScreen = useMediaQuery({maxWidth: 1024});
  const [screenStyles, setScreenStyles] = useState<ScreenStylesType>('largeScreen');

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
    if (mediumScreen) {
      setScreenStyles('mediumScreen');
    } else {
      setScreenStyles('largeScreen');
    }
  },[mediumScreen])

  return (  
    <nav ref={ref} > 
      <PageMenuScreen 
        styles={sideStyles[screenStyles].kids}
        page="kids"
        Component={KidsScreen}
        handleClick={() => swipeToKids()}
      >
        
      </PageMenuScreen>
      <PageMenuScreen 
        styles={sideStyles[screenStyles].adult}
        page="adult"
        Component={AdultScreen}
        handleClick={() => swipeToAdult()}
      >
      </PageMenuScreen>
    </nav>
  );
};

export default observer(PageMenu);