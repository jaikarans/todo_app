import { HStack, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import NewNoteCard from "../components/NewNoteCard";
import NoteCard from "../components/NoteCard";

export type Todo = {
  id:number;
  title: string;
  description: string;
  tasks?: {uid:number, taskString:string}[]
};

const Home = () => {

  // const [x, setX] = useState<string | Boolean>()

  const [id, setId] = useState<number>(-1)
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  
  const onEdit = (id:number) => {
    console.log(id)
  }

  const onDelete = (id:number) => {
    const newArray = todoList?.filter((todo) => (todo.id !== id))
    setTodoList(newArray)
  }

  const handleAddNote = () => {
    setId(id+1)
    setTodoList(prev=> [...prev, {title, description, id} as Todo])
    setTitle("")
    setDescription("")
  }
  
  return (
    <HStack spacing={10} mt={10} flexWrap='wrap' justifyContent='center' >
      <NewNoteCard setTitle={setTitle} setDescription={setDescription} handleAddNote={handleAddNote} title={title} description={description} />
      {todoList?.map((todo) => (
        <NoteCard key={todo.id} title={todo.title} description={todo.description} id={todo.id} onEdit={onEdit} onDelete={onDelete}  />
      ))}
    </HStack>
  );
};

export default Home;
