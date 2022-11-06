import {ToDoList} from "../interfaces";

const List = ({toDoList}: { toDoList: ToDoList }): JSX.Element => {
  if (toDoList.length === 0) {
    return (
      <div>
        <p>Empty ToDo</p>
      </div>
    )
  }
  return (
    <ul>
      {toDoList.map((toDoItem) => (
        <li key={toDoItem.id}>{toDoItem.todo}</li>
      ))}
    </ul>
  )
}

export default List;
