import homeText from "@/store/text/home";
import menuSections from "@/store/text/menuSecton";
import {useEffect, useState} from "react";

export const useLoad=()=>{
  const {landingsText}=homeText
  const {menuSectionTitle}=menuSections
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    if (landingsText && menuSectionTitle){
      setIsLoad(false)
      console.log("load end")
    }else {
      console.log("load")
      setIsLoad(true)
    }
  }, [menuSectionTitle, landingsText]);

  return isLoad
}