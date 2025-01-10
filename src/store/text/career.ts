import {makeAutoObservable} from "mobx";
import {fetchData} from "@/utils/fetchData";
import {ICareer, IData, IForm} from "@/typesData";

class Store {
  careerList: null | ICareer[] = null;
  formText: IForm|null=null

  constructor() {
    makeAutoObservable(this);
  }

  setCareerList= (data?: null|ICareer[])=> {
    if (data)
      this.careerList = data
  }
  setFormText= (data?: null|IForm)=> {
    if (data)
     this.formText = data
  }

  setAllCareer=(data: IData)=>{
    this.setCareerList(data.careerList)
    this.setFormText(data.formText)
  }
}

export default new Store();