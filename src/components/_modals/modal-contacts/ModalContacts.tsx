'use client'
import React, {useEffect} from 'react';
import "./modal-menu.scss"
import { observer } from 'mobx-react-lite';
import store from "@/store/store";
import Curtain from "@/components/curtain/Сurtain";
import CloseModalButton from "@/components/close-modal-button/CloseModalButton";
import {useHash} from "@/components/_hooks/useHash";
import Contacts from "@/components/_sections/contacts/Contacts";

const ModalContacts = () => {
  const hash= useHash()
  const {isModalContactsOpened, changeModalContactsOpened}=store

  useEffect(() => {
    if (isModalContactsOpened)
      changeModalContactsOpened(false)
  }, [hash]);
  return (
      <Curtain show={isModalContactsOpened} className="">
        <CloseModalButton func={()=> changeModalContactsOpened(false)}/>

        <Contacts/>
      </Curtain>
  );
};

export default observer(ModalContacts);
