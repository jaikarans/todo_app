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
import React from "react";
import { render } from '@testing-library/react';

export type TodoProps = {
  title: string;
  description: string;
  id: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};
const NoteCard: React.FC<TodoProps> = ({ description, title, id, onEdit, onDelete }) => {
  // const [title, setTitle] = useState("Design an Card for ToDo app");
  // const [description, setDescription] = useState(
  //   "Make this card functional and make it more beautiful"
  // );
  return (
    <Card shadow="xl"borderColor={"purple.300"} borderRadius={15}  borderWidth={4} boxSize="300">
      <Box>
        <HStack>
          <CardHeader>
            <Heading size="md" alignSelf="flex-start">
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
              onClick={()=>onEdit(id)}
            />
          </Tooltip>
        </HStack>
        <Divider size="md" />
      </Box>
      <VStack spacing={2} justifyContent="flex-start" p={5}>
        {/* render description only if description string is not empty */}
        if (description){
          <Text fontSize="medium" alignSelf='flex-start' flexWrap="wrap">{description}</Text>
        }
        <IconButton
          aria-label="Search database"
          icon={<DeleteIcon />}
          alignSelf="flex-end"
          pos="absolute"
          bottom="4"
          rounded="full"
          bg="red.400"
          _hover={{bg: "red.500"}}
          onClick={() => onDelete(id)}
        />
      </VStack>
    </Card>
  );
};

export default NoteCard;
