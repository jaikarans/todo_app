import { Todo } from "../pages/Home";

const saveTodoListToLocalStorage = (todoList: Todo[]) => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  console.log('inside saveTodoListToLocalStorage', todoList);

}

export default saveTodoListToLocalStorage;