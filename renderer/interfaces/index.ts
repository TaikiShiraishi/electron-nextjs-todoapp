// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {IpcRenderer} from 'electron'

type Getlist = () => Promise<ToDoList>;
type Setlist = (data: ToDoList) => Promise<void>;
export type Dataapi = {
  getlist: Getlist;
  setlist: Setlist;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer
    }
  }

  interface Window {
    dataapi: Dataapi
    MY_API: {
      getAnswer: () => number;
    }
  }
}

export type ToDoItem = {
  id: string;
  todo: string;
  isDone: boolean;
}

export type ToDoList = ToDoItem[];
