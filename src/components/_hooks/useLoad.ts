import homeText from "@/store/text/home";
import general from "@/store/text/general";
import career from "@/store/text/career";
import projects from "@/store/text/Projects";
import {useEffect, useState} from "react";

export const useLoad=()=>{
  const {landingsText, aboutText, ideasText, contactsText, faqText}=homeText
  const {menuSectionTitle, footers}=general
  const {careerList, formText} =career
  const {projectsList}=projects
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    if (landingsText && menuSectionTitle && footers && careerList && formText && projectsList && aboutText && ideasText && contactsText && faqText){
      setIsLoad(false)
      console.log("load end")
    }else {
      console.log("load")
      setIsLoad(true)
    }
  }, [menuSectionTitle, footers, landingsText, careerList, formText, projectsList, aboutText, ideasText, contactsText, faqText]);

  return isLoad
}