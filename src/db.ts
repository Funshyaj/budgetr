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
  FixedBudgetInputs!: Table<InputsDb>; 
  Analyses!: Table<Analysis>; 

  constructor() {
    super('FixedBudgetDatabase');
    this.version(1).stores({
      FixedBudgetInputs: '++id, name, price' // Primary key and indexed props
    })
    
    this.version(2).stores({
     Analyses : 'id, fixedInput, analysis, total,  UserName' // Primary key and indexed props
    });
  }
}

class MySubClassedDexie2 extends Dexie {
  NonFixedBudgetInputs!: Table<InputsDb>; 
  Analysis!: Table<{
    id?:0;
    total:number;
    UserName:'';
  }>

  constructor() {
    super('NonFixedBudgetDatabase');
    this.version(3).stores({
      NonFixedBudgetInputs: '++id, name, price' // Primary key and indexed props
    });

    this.version(4).stores({
      Analysis : 'id, total,  UserName' // Primary key and indexed props
     });
  
  }
}


export const db1 = new MySubClassedDexie1();
export const db2 = new MySubClassedDexie2();