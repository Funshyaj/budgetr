import Dexie, { Table } from 'dexie';

export interface Analysis {          
  id?:0;
  fixedInput: number;
  analysis:string;
  total:number;
  UserName:'';
}

export interface InputsDb {          
  id?: number;
  name: string;
  price: any ;
}


class MySubClassedDexie1 extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  FixedBudgetInputs!: Table<InputsDb>; 
  Analyses!: Table<Analysis>; 

  constructor() {
    super('FixedBudgetDatabase');
    this.version(1).stores({
      FixedBudgetInputs: '++id, name, price' // Primary key and indexed props
    })
    
    this.version(2).stores({
     Analyses : 'id, fixedInput, analysis, total' // Primary key and indexed props
    });
  }
}

class MySubClassedDexie2 extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  NonFixedBudgetInputs!: Table<InputsDb>; 
  Analysis!: Table<{
    id?:0;
    total:number;
    UserName:''

  }>
  constructor() {
    super('NonFixedBudgetDatabase');
    this.version(1).stores({
      NonFixedBudgetInputs: '++id, name, price' // Primary key and indexed props
    });

    this.version(2).stores({
      Analysis : 'id, total' // Primary key and indexed props
     });
  
  }
}

export const db1 = new MySubClassedDexie1();
export const db2 = new MySubClassedDexie2();