'use client';
import AdultScreen from "../adult-screen/AdultScreen";
import KidsScreen from "../kids-screen/KidsScreen";
import './page-menu.scss';
import PageMenuSide from './PageMenuSide';

const transitionProperty = "translate 0.6s, width 0.4s";

const transitionStyles = {
  kids: {
    defaultStyles: {width: '50vw', translate:"-100%", transition: transitionProperty},
    onOpen : {
      entering: {width: '50vw', translate: "0%"},
      entered: {width: '50vw', translate: "0%"},
      exiting:  { width: '50vw', translate: "-100%" },
      exited:  { width: '50vw', translate: "-100%" },
    },
    onCurrentPage : {
      entering: {width: '100vw', translate: "0%"},
      entered: {width: '100vw', translate: "0%", flexShrink: 0},
      exiting:  { width: '50vw', translate: "0%"},
      exited:  { width: '50vw', translate: "0%" },
    },
  },
  adult: {
    defaultStyles: {width: '50vw', translate:"100%", transition: transitionProperty},
    onOpen : {
      entering: {width: '50vw', translate: "0%"},
      entered: {width: '50vw', translate: "0%"},
      exiting:  { width: '50vw', translate: "100%" },
      exited:  { width: '50vw', translate: "100%" },
    },
    onCurrentPage : {
      entering: {width: '100vw', translate: "0%"},
      entered: {width: '100vw', translate: "0%", flexShrink: 0},
      exiting:  { width: '50vw', translate: "0%" },
      exited:  { width: '50vw', translate: "0%" },
    },
  }
}

const PageMenu = () => {
  return (
    <nav className="page-menu">
      <PageMenuSide 
        styles={transitionStyles.kids}
        path="/for-kids"
        Component={KidsScreen}
      >
        
      </PageMenuSide>
      <PageMenuSide 
        styles={transitionStyles.adult}
        path="/for-adult"
        Component={AdultScreen}
      >
      </PageMenuSide>
    </nav>
  );
};

export default PageMenu;