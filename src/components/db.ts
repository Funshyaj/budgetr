import Dexie, { Table } from 'dexie';

export interface InputsDb {          
  id?: number;
  name: string;
  price: number;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  FixedBudgetInputs!: Table<InputsDb>; 

  constructor() {
    super('FixedBudgetDatabase');
    this.version(1).stores({
      FixedBudgetInputs: '++id, name, price' // Primary key and indexed props
    });
  }
}

export const db1 = new MySubClassedDexie();