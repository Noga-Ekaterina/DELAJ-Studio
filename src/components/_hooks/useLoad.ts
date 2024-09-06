import homeText from "@/store/text/home";
import menuSections from "@/store/text/menuSecton";
import career from "@/store/text/career";
import projects from "@/store/text/Projects";
import {useEffect, useState} from "react";

export const useLoad=()=>{
  const {landingsText}=homeText
  const {menuSectionTitle}=menuSections
  const {careerList} =career
  const {projectsList}=projects
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    if (landingsText && menuSectionTitle && careerList && projectsList){
      setIsLoad(false)
      console.log("load end")
    }else {
      console.log("load")
      setIsLoad(true)
    }
  }, [menuSectionTitle, landingsText, careerList, projectsList]);

  return isLoad
}