import general from "@/store/text/general";
import career from "@/store/text/career";
import projects from "@/store/text/Projects";
import {useEffect, useState} from "react";

export const useLoad=()=>{
  const {menuSectionTitle, footers}=general
  const {careerList, formText} =career
  const {projectsList}=projects
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    if ( menuSectionTitle && footers && careerList && formText && projectsList){
      setIsLoad(false)
    }else {
      setIsLoad(true)
    }
  }, [menuSectionTitle, footers, careerList, formText, projectsList]);

  return isLoad
}