import React from 'react';
import MainScreen from "@/components/main-screen/MainScreen";

const Loading = () => {
  return (
      <>
        <MainScreen loader={true}/>
      </>
  );
};

export default Loading;
