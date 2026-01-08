import {makeAutoObservable} from "mobx";
import {fetchData} from "@/utils/fetchData";
import {ICareer, IData, IForm} from "@/typesData";

class Store {
  careerList: null | ICareer[] = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCareerList= (data?: null|ICareer[])=> {
    if (data)
      this.careerList = data
  }

  setAllCareer=(data: IData)=>{
    this.setCareerList(data.careerList)
  }
}

export default new Store();