'use client';
import { usePathname } from "next/navigation";
import AdultScreen from "../adult-screen/AdultScreen";
import KidsScreen from "../kids-screen/KidsScreen";
import './page-menu.scss';
import PageMenuSide from './PageMenuSide';

const duration = 0.6;
const transitionProperty = `${duration}s ease-in`;



const transitionStyles = {
  kids: {
    defaultStyles: {width: '50vw', left:"-50%", transition: transitionProperty},
    onOpen : {
      entering: {width: '50vw', left: "0%"},
      entered: {width: '50vw', left: "0%"},
      exiting:  { width: '50vw', left: "-50%" },
      exited:  { width: '50vw', left: "-50%" },
    },
    onCurrentPage : {
      entering: {width: '100vw', left: "0%"},
      entered: {width: '100vw', left: "0%", flexShrink: 0},
      exiting:  { width: '50vw', left: "0%"},
      exited:  { width: '50vw', left: "0%" },
    },
  },
  adult: {
    defaultStyles: {width: '50vw', right:"-50%", transition: transitionProperty},
    onOpen : {
      entering: {width: '50vw', right: "0%"},
      entered: {width: '50vw', right: "0%"},
      exiting:  { width: '50vw', right: "-50%" },
      exited:  { width: '50vw', right: "-50%" },
    },
    onCurrentPage : {
      entering: {width: '100vw', right: "0%"},
      entered: {width: '100vw', right: "0%", flexShrink: 0},
      exiting:  { width: '50vw', right: "0%"},
      exited:  { width: '50vw', right: "0%"},
    },
  }
}

const PageMenu = () => {
  const path = usePathname();

  if (path.includes('/menu')) return null;

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