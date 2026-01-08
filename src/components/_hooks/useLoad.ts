import general from "@/store/text/general";
import career from "@/store/text/career";
import {useEffect, useState} from "react";

export const useLoad=()=>{
  const {menuSectionTitle, footers}=general
  const {careerList} =career
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    if ( menuSectionTitle && footers && careerList ){
      setIsLoad(false)
    }else {
      setIsLoad(true)
    }
  }, [menuSectionTitle, footers, careerList ]);

  return isLoad
}