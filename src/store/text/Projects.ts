import {makeAutoObservable} from "mobx";
import {fetchData} from "@/utils/fetchData";

class Store {
  projectsList= null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProjectsList=async ()=> {
    this.projectsList = await fetchData
    ('Projects/data.json');
  }
}

export default new Store();