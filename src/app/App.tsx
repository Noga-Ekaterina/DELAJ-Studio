'use client'

import React, {useEffect} from 'react';
import {IWithChildren} from "@/types";
import Header from "@/components/header/Header";
import SmoothScrolling from "@/app/SmoothScrolling";
import ModalMenu from "@/components/_modals/modal-menu/ModalMenu";
import ModalContacts from "@/components/_modals/modal-contacts/ModalContacts";
import text from "@/store/text/menuSecton";
import {useLoad} from "@/components/_hooks/useLoad";
import {observer} from "mobx-react-lite";

const App = ({children}:IWithChildren) => {
  const {fetchMenuSectionTitle}=text
  const isload= useLoad()

  useEffect(() => {
    fetchMenuSectionTitle()
  }, []);
  return (
      <>
        {!isload && <Header/>}
        <SmoothScrolling>{children}</SmoothScrolling>
        <ModalMenu/>
        <ModalContacts/>
      </>
  );
};

export default observer(App);
