'use client';
import { usePathname } from "next/navigation";
import AdultScreen from "../adult-screen/AdultScreen";
import KidsScreen from "../kids-screen/KidsScreen";
import './page-menu.scss';
import PageMenuScreen from './PageMenuScreen';
import { transitionStyles } from "@/vars";

const styles = {
  largeScreen: {
    kids: {
      defaultStyles: {width: '50vw', left:"-50%" , transition: transitionStyles.transition},
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
      defaultStyles: {width: '50vw', right:"-50%" , transition: transitionStyles.transition},
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
      defaultStyles: {height: '50vh', top: '-50%', transition: transitionStyles.transition},
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
      defaultStyles: { height: '50vh', bottom:"-50%" , transition: transitionStyles.transition},
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

const PageMenu = () => {
  const path = usePathname();

  if (path.includes('/menu')) return null;

  return (
    <nav className="page-menu">
      <PageMenuScreen 
        styles={styles.mediumScreen.kids}
        path="/for-kids"
        Component={KidsScreen}
      >
        
      </PageMenuScreen>
      <PageMenuScreen 
        styles={styles.mediumScreen.adult}
        path="/for-adult"
        Component={AdultScreen}
      >
      </PageMenuScreen>
    </nav>
  );
};

export default PageMenu;