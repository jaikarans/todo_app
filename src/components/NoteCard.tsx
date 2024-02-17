import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Heading,
  HStack,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CheckList from "./CheckList";
import { Todo } from "../pages/Home";
import NewCheckList from "./NewCheckList";

export type TodoProps = {
  handleSetTodoList: (callback: (prev: Todo[]) => Todo[]) => void;
  title: string;
  description: string;
  id: string;
  todoList: Todo[];
};

const NoteCard: React.FC<TodoProps> = ({
  handleSetTodoList,
  description,
  title,
  id,
  todoList,
}) => {
  const [renderNoteCard, setRenderNoteCard] = useState<string>("render");
  const [enableEdit, setEnableEdit] = useState<boolean>(false);

  console.log("NoteCard is rendered", renderNoteCard, " ", todoList);

  const onDelete = (id: string) => {
    const newArray = todoList?.filter((todo) => todo.id !== id);
    handleSetTodoList(() => newArray);
  };

  return (
    <Card
      shadow="xl"
      borderColor={"purple.300"}
      borderWidth={2}
      borderRadius={15}
      width={400}
      mx="2"
    >
      <Box>
        <HStack>
          <CardHeader>
            <Heading fontFamily={"cursive"} size="md" alignSelf="flex-start">
              {title}
            </Heading>
          </CardHeader>
          <Tooltip hasArrow label="Edit">
            <IconButton
              aria-label="Search database"
              variant="solid"
              bg="#9ACD32"
              pos="absolute"
              top="-4"
              right="-4"
              _hover={{ bg: "#8AB329" }}
              icon={<EditIcon />}
              alignSelf="flex-end"
              rounded="full"
              onClick={() => setEnableEdit(!enableEdit)}
            />
          </Tooltip>
        </HStack>
        <Divider size="md" />
      </Box>
      <VStack spacing={2} p={5}>
        {/* render description only if description string is not empty */}
        description && (
        <Text
          fontFamily={"cursive"}
          fontSize="medium"
          alignSelf="flex-start"
          flexWrap="wrap"
        >
          {description}
        </Text>
        )
        {todoList
          ?.find((todo) => todo.id === id)
          ?.tasks?.map((tsk) => (
            <CheckList
              key={tsk.uid}
              todoList={todoList}
              handleSetTodoList={handleSetTodoList}
              id={id}
              _uid={tsk.uid}
              _taskString={tsk.taskString}
              _isChecked={tsk.isChecked}
              setRenderNoteCard={setRenderNoteCard}
            />
          ))}
        {enableEdit && (
          <NewCheckList
            todoList={todoList}
            handleSetTodoList={handleSetTodoList}
            id={id}
            setRenderNoteCard={setRenderNoteCard}
          />
        )}
        <IconButton
          aria-label="Search database"
          icon={<DeleteIcon />}
          alignSelf="flex-end"
          rounded="full"
          bg="red.400"
          _hover={{ bg: "red.500" }}
          onClick={() => onDelete(id)}
        />
      </VStack>
    </Card>
  );
};

export default NoteCard;
