import {makeAutoObservable} from "mobx";
import {fetchData} from "@/utils/fetchData";
import {ICareer} from "@/typesData";

export interface ICareerDuties {
  title: string
  list: string[]
}

export type CareerOptionType = 'Freelance' | 'Full time' | 'Part time';


class Store {
  careerList: null | ICareer[] = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCareerList=async ()=> {
    this.careerList = await fetchData('Slides/Vacancy/data.json');
  }
}

export default new Store();