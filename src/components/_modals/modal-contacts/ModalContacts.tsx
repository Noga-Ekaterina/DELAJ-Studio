'use client'
import React, {useEffect} from 'react';
import "./modal-contacts.scss"
import { observer } from 'mobx-react-lite';
import store from "@/store/store";
import Curtain from "@/components/curtain/Сurtain";
import CloseButtons from "@/components/close-modal-button/CloseButtons";
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
      <Curtain show={isModalContactsOpened} className="modal-contacts">
        <CloseButtons func={()=> changeModalContactsOpened(false)}/>

        <Contacts/>
      </Curtain>
  );
};

export default observer(ModalContacts);
