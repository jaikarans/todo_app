import {
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Task, Todo } from "../pages/Home";
import generateUid from "../utils/idGenerator";
import saveTodoListToLocalStorage from "../utils/saveLocalStorage";

type CheckListProps = {
  todoList: Todo[];
  handleSetTodoList: (callback: (prev: Todo[]) => Todo[]) => void;
  id: string;
  _uid: string;
  _taskString: string;
  _isChecked: boolean;
  setRenderNoteCard: React.Dispatch<React.SetStateAction<string>>;
};

const CheckList: React.FC<CheckListProps> = ({
  todoList,
  handleSetTodoList,
  id,
  _uid,
  _taskString,
  _isChecked,
  setRenderNoteCard,
}) => {
  console.log("CheckList is rendering", todoList);
  const [bodyBg, setBodyBg] = useState<string>("BlackAlpha.200");
  const [lineThroughText, setLineThroughText] = useState<string>("none");
  const [editTextDisable, setEditTextDisable] = useState<boolean>(false);
  const [uid, setUid] = useState<string>(_uid);
  const [taskString, setTaskString] = useState<string>(_taskString);
  const [isChecked, setIsChecked] = useState<boolean>(_isChecked);

  const addTask = (id: string, uid: string, taskString: string): void => {
    const newTaskToAdd: Task = { uid, taskString, isChecked: false };

    const _todo: Todo[] = todoList;
    const _tempTodo = _todo.find((todo) => todo.id === id);

    const task = _tempTodo?.tasks?.find((tsk) => tsk.uid === uid);

    if (task !== undefined) {
      task.taskString = taskString;
      console.log("ff", _tempTodo);
      console.log(todoList);
    } else {
      _tempTodo?.tasks?.push(newTaskToAdd);
      console.log("ff", _tempTodo);
      console.log(todoList);
    }
    handleSetTodoList(() => _todo);
    saveTodoListToLocalStorage(_todo);
  };

  const checkUncheckTheTask = (
    id: string,
    uid: string,
    isChecked: boolean
  ): void => {
    console.log("end checkuncheck", todoList);
    const _todo = todoList;
    const _tempTodo = _todo.find((todo) => todo.id === id);
    const task = _tempTodo?.tasks?.find((tsk) => tsk.uid === uid);
    if (task !== undefined) {
      task.isChecked = isChecked;
    }
    handleSetTodoList(() => _todo);
    saveTodoListToLocalStorage(_todo);
    console.log("end checkuncheck", todoList);
  };

  const handleCheckBoxChange = (): void => {
    // don't check the box if task string is empty
    if (taskString === "" || taskString === undefined) {
      return;
    }
    // when checkbox is checked if will get executed
    // i am storing the isChecked becuase useState doesn't change value in js before re-rendering
    const previousCheckStatus = isChecked;
    console.log("inside CheckBoxChange: isChecked = ", previousCheckStatus);
    if (previousCheckStatus === false) {
      setIsChecked(true);
      setBodyBg("green.100");
      // cuts the text with line when checkbox is checked means task is completed
      setLineThroughText("line-through");
      // don't allow user to edit the text when checkbox is checked
      setEditTextDisable(!editTextDisable);
      checkUncheckTheTask(id, uid, !previousCheckStatus);
    } else {
      setIsChecked(false);
      setBodyBg("BlackAlpha.200");
      setLineThroughText("none");
      setEditTextDisable(!editTextDisable);
      checkUncheckTheTask(id, uid, !previousCheckStatus);
    }
    console.log("end of CheckBoxChange: isChecked = ", previousCheckStatus);
  };

  const deleteTask = (id: string, uid: string): void => {
    const tasks = todoList.find((todo) => todo.id === id)?.tasks;
    if (tasks !== undefined) {
      for (let i = 0; i < tasks?.length; i++) {
        if (tasks[i].uid === uid) {
          tasks.splice(i, 1);
        }
      }
    }
    setRenderNoteCard(generateUid());
    console.log("delete Task : todoList = ", todoList);
    saveTodoListToLocalStorage(todoList);
    console.log("delete Task : tasks = ", tasks);
  };

  console.log("inside checklist", isChecked);

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
        onChange={(e) => {
          handleCheckBoxChange();
        }}
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
        onClick={() => deleteTask(id, uid)}
      />
    </HStack>
  );
};

export default CheckList;
