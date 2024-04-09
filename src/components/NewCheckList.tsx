import { DeleteIcon } from "@chakra-ui/icons";
import {
  HStack,
  Checkbox,
  Editable,
  EditablePreview,
  EditableInput,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Task, Todo } from "../pages/Home";
import generateUid from "../utils/idGenerator";
import saveTodoListToLocalStorage from "../utils/saveLocalStorage";

type NewCheckListProps = {
  todoList: Todo[];
  handleSetTodoList: (callback: (prev: Todo[]) => Todo[]) => void;
  id: string;
  setRenderNoteCard: React.Dispatch<React.SetStateAction<string>>;
};

const NewCheckList: React.FC<NewCheckListProps> = ({
  todoList,
  handleSetTodoList,
  id,
  setRenderNoteCard,
}) => {
  console.log("NewCheckList is rendering");
  const [bodyBg, setBodyBg] = useState<string>("BlackAlpha.200");
  const [lineThroughText, setLineThroughText] = useState<string>("none");
  const [editTextDisable, setEditTextDisable] = useState<boolean>(false);
  const [uid, setUid] = useState<string>(generateUid);
  const [taskString, setTaskString] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toast = useToast();

  const addTask = (id: string, uid: string, taskString: string): void => {
    if (taskString === "") return;
    const newTaskToAdd: Task = { uid, taskString, isChecked: false };

    const _todo: Todo[] = todoList;
    const tasks: Task[] | undefined = _todo.find(
      (todo) => todo.id === id
    )?.tasks;

    tasks?.push(newTaskToAdd);
    handleSetTodoList(() => _todo);
    console.log(todoList);

    setUid(generateUid());
    setTaskString("");
    setIsChecked(false);
    setRenderNoteCard(generateUid());
    saveTodoListToLocalStorage(_todo);
  };

  const ErrorToast = () => {
    toast({
      title: "first enter task and submit it by clicking enter",
      status: "error",
      isClosable: true,
    });
  };

  return (
    <HStack
      mx="2"
      mb="0.2"
      p={1}
      boxSize="full"
      bg={bodyBg}
      borderRadius={10}
      borderWidth={1}
      borderColor="grey"
    >
      <Checkbox
        isChecked={isChecked}
        onChange={ErrorToast}
        colorScheme={"green"}
        borderColor={"green.200"}
        _hover={{ borderColor: "green.300" }}
        px={1}
      />
      <Editable
        isDisabled={editTextDisable}
        selectAllOnFocus={false}
        width={"full"}
        onChange={(e) => setTaskString(e)}
        onSubmit={() => {
          addTask(id, uid, taskString);
        }}
        value={taskString}
      >
        <EditablePreview
          textDecorationLine={lineThroughText}
          shadow={"none"}
          fontFamily={"cursive"}
          width={"full"}
        />
        <EditableInput _focus={{ boxShadow: "none" }} fontFamily="cursive" />
      </Editable>
      <IconButton
        aria-label="Search database"
        icon={<DeleteIcon />}
        size="xs"
        rounded="full"
        bg="orange.400"
        _hover={{ bg: "orange.500" }}
        onClick={ErrorToast}
      />
    </HStack>
  );
};

export default NewCheckList;
