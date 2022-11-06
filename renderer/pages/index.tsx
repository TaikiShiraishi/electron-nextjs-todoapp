import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import {Dataapi, ToDoItem, ToDoList} from "../interfaces";
import {v4 as uuidv4} from 'uuid';
import List from "../components/List";

let dataapi: Dataapi;

const IndexPage = () => {
  const [todoText, setToDoText] = useState<string>('');
  const [toDoList, setToDoList] = useState<ToDoList>([]);
  useEffect(() => {
    dataapi = window.dataapi;
    (async () => {
      const list = await dataapi.getlist();
      setToDoList(list);
    })();
  }, []);

  const onHandleSubmitAddToDo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = uuidv4();
    const newToDo: ToDoItem = {
      isDone: false,
      todo: todoText,
      id,
    }
    const newToDoList: ToDoList = [...toDoList, newToDo];
    await dataapi.setlist(newToDoList);
    setToDoList(newToDoList);
    setToDoText('');
  }

  return (
    <Layout title='Home | Next.js + TypeScript + Electron Example'>
      <h1>ToDo リスト</h1>
      <form onSubmit={onHandleSubmitAddToDo}>
        <input type="text" value={todoText} onChange={(event) => setToDoText(event.target.value)}/>
        <button type="submit">追加</button>
      </form>
      <List toDoList={toDoList}/>
    </Layout>
  );
};

export default IndexPage;

