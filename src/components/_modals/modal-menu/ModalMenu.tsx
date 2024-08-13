'use client'
import React, {useEffect} from 'react';
import "./modal-menu.scss"
import { observer } from 'mobx-react-lite';
import store from "@/store/store";
import Curtain from "@/components/curtain/Сurtain";
import CloseModalButton from "@/components/close-modal-button/CloseModalButton";
import Menu from "@/components/_sections/menu/Menu";
import {useHash} from "@/components/_hooks/useHash";

const ModalMenu = () => {
  const hash= useHash()
  const {isModalMenuOpened, changeModalMenuOpened}=store

  useEffect(() => {
    if (isModalMenuOpened)
      changeModalMenuOpened(false)
  }, [hash]);
  return (
      <Curtain show={isModalMenuOpened} className="modal-menu-wrap">
        <CloseModalButton func={()=> changeModalMenuOpened(false)}/>

        <Menu/>
      </Curtain>
  );
};

export default observer(ModalMenu);
