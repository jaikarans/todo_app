import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import NewNoteCard from "../components/NewNoteCard";
import NoteCard from "../components/NoteCard";

export type Todo = {
  id: string;
  title: string;
  description: string;
  tasks?: Task[];
};

export type Task = {
  uid: string;
  taskString: string;
  isChecked: boolean;
};

const getTodoFromLocal = () => {
  const todoString = localStorage.getItem('todoList');
  if(todoString) {
    return JSON.parse(todoString) as Todo[];
  } else {
    return [];
  }
}

const Home = () => {

  const [todoList, setTodoList] = useState<Todo[]>(getTodoFromLocal());

  console.log("Home is rendered", todoList);

  const handleSetTodoList = (callback: (prev: Todo[]) => Todo[]) => {
    setTodoList((prevtodo) => callback(prevtodo));
  };

  return (
    <HStack spacing={10} mt={10} flexWrap="wrap" justifyContent="center">
      <NewNoteCard todoList={todoList} handleSetTodoList={handleSetTodoList} />
      {todoList?.map((todo) => (
        <NoteCard
          handleSetTodoList={handleSetTodoList}
          key={todo.id}
          title={todo.title}
          description={todo.description}
          id={todo.id}
          todoList={todoList}
        />
      ))}
    </HStack>
  );
};

export default Home;
