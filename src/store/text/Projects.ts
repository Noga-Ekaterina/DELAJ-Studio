import {makeAutoObservable} from "mobx";
import {IProjectsList} from "@/typesData";

class Store {
  projectsList: null | IProjectsList= null;

  constructor() {
    makeAutoObservable(this);
  }

  setProjectsList= (data?: null|IProjectsList)=> {
    if (data)
      this.projectsList = data
  }
}

export default new Store();