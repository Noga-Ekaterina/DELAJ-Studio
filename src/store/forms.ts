import { IFormData } from '@/types';
import {makeAutoObservable} from 'mobx';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  fields : IFormData[] = []
  
  setFields(fields: IFormData[]) {
    this.fields = fields;
  }
 
}

export default new Store();