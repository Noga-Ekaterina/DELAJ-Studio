import {makeAutoObservable} from "mobx";
import {fetchData} from "@/utils/fetchData";
import {ICareer, IForm} from "@/typesData";

class Store {
  careerList: null | ICareer[] = null;
  formText: IForm|null=null

  constructor() {
    makeAutoObservable(this);
  }

  fetchCareerList=async ()=> {
    this.careerList = await fetchData('Slides/Vacancy/data.json');
  }
  fetchFormText=async ()=> {
    this.formText = await fetchData('Slides/Vacancy/form.json');
  }

  fetchAllCareer=()=>{
    this.fetchCareerList()
    this.fetchFormText()
  }
}

export default new Store();