import {
  Card,
  VStack,
  StackDivider,
  HStack,
  CardHeader,
  Button,
  CardBody,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Task, Todo } from "../pages/Home";
import generateUid from "../utils/idGenerator";

type NewNoteCardProps = {
  todoList: Todo[];
  handleSetTodoList: (callback: (prev: Todo[]) => Todo[]) => void;
};

const NewNoteCard: React.FC<NewNoteCardProps> = ({
  todoList,
  handleSetTodoList,
}) => {
  const [titleInputBoxColor, setTitleInputBoxColor] = useState<string>("grey");
  const [titleInputBoxWidth, setTitleInputBoxWidth] = useState<number>();
  const toast = useToast();

  const [id, setId] = useState<string>(generateUid);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>();

  console.log("NewNoteCard is rendered");

  const handleCreateTodo = () => {
    if (!title) {
      setTitleInputBoxColor("red");
      setTitleInputBoxWidth(3);
      toast({
        title: "Title can not be empty!!",
        status: "error",
        isClosable: true,
      });
    } else {
      setTitleInputBoxColor("grey");
      setTitleInputBoxWidth(1);
      handleSetTodoList((prev: Todo[]) => [
        ...prev,
        { id, title, description, tasks } as Todo,
      ]);
      setId(generateUid());
      setTasks([]);
      setTitle("");
      setDescription("");
      console.log("inside handleCreateTodo ", todoList);
    }
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
      <VStack alignItems="flex-start" divider={<StackDivider />}>
        <HStack>
          <CardHeader>
            <Input
              isRequired={true}
              borderColor={titleInputBoxColor}
              borderWidth={titleInputBoxWidth}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              value={title}
            />
          </CardHeader>
        </HStack>
        <CardBody>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            as={Textarea}
            value={description}
          />
          <Button
            mt="2"
            bg="blue.400"
            _hover={{ bg: "blue.500" }}
            onClick={handleCreateTodo}
          >
            Create Todo
          </Button>
        </CardBody>
      </VStack>
    </Card>
  );
};

export default NewNoteCard;
