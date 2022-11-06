/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ipcRenderer, IpcRenderer, contextBridge} from 'electron'

type Getlist = () => Promise<ToDoList>;
type Setlist = (data: ToDoList) => Promise<void>;
type Dataapi = {
  getlist: Getlist;
  setlist: Setlist;
}

declare global {
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer
    }
  }

  interface Window {
    dataapi: Dataapi;
    MY_API: {
      getAnswer: () => number;
    }
    ipcRenderer: IpcRenderer
  }
}

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
// process.once('loaded', () => {
//   global.ipcRenderer = ipcRenderer
// });

export type ToDoItem = {
  id: string;
  todo: string;
  isDone: boolean;
}

export type ToDoList = ToDoItem[];

contextBridge.exposeInMainWorld('dataapi', {
  getlist: () => ipcRenderer.invoke('getlist'),
  setlist: (data: ToDoList) => ipcRenderer.invoke('setlist', data),
});

contextBridge.exposeInMainWorld('MY_API', {
  getAnswer() {
    return 42;
  },
});
