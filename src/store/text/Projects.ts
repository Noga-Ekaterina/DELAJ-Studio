import {makeAutoObservable} from "mobx";
import {fetchData} from "@/utils/fetchData";
import {IProjectsList} from "@/typesData";

class Store {
  projectsList: null | IProjectsList= null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProjectsList=async ()=> {
    this.projectsList = await fetchData
    ('Projects/data.json');
  }
}

export default new Store();