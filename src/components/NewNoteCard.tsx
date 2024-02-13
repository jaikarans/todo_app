import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { Card, VStack, StackDivider, HStack, CardHeader, Heading, Tooltip, Button, CardBody, Text, Input, IconButton, Textarea, Toast, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Todo } from '../pages/Home';
import { TodoProps } from './NoteCard';

type NewNoteCardProps = {
  setDescription:React.Dispatch<React.SetStateAction<string | undefined>>
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>
  handleAddNote:() => void
  title: string | undefined
  description: string | undefined
}

const NewNoteCard:React.FC<NewNoteCardProps> = ({setDescription, setTitle, handleAddNote, title, description})=> {
  const [titleInputBoxColor, setTitleInputBoxColor] = useState<string>('grey');
  const [titleInputBoxWidth, setTitleInputBoxWidth] = useState<number>()
  const toast = useToast()

  return (
    <Card shadow="dark-lg" mx='2' boxSize="300" >
      <VStack alignItems="flex-start" divider={<StackDivider />}>
        <HStack>
          <CardHeader>
            <Input borderColor={titleInputBoxColor} borderWidth={titleInputBoxWidth} onChange={(e) => setTitle(e.target.value)} placeholder='Title' value={title}/>
          </CardHeader>
          <Tooltip hasArrow label='Create a new Todo List'>
          <IconButton aria-label='Search database'
            variant="solid"
            bg="purple.400"
            pos="absolute"
            top="-4"
            right="-4"
            _hover={{bg:"purple.500"}}
            icon={<AddIcon />} alignSelf="flex-end" 
            rounded="full"
          />
          </Tooltip>
        </HStack>
        <CardBody>
        <Input onChange={(e) => setDescription(e.target.value)} placeholder='Description'  as={Textarea} value={description}/>
          <Button
            mt="2"
            bg="blue.400"
            _hover={{bg: "blue.500"}}
            onClick={() => {
              // if title string is empty them does not save the todo list
              if(!title) {
                setTitleInputBoxColor('red')
                setTitleInputBoxWidth(3)
                toast({title: 'Title can not be empty!!', status:'error', isClosable: true})

              } else {
                handleAddNote()
                setTitleInputBoxColor('grey')
                setTitleInputBoxWidth(1)
              }
              
            }}
          >
            Add Note
          </Button>
        </CardBody>
      </VStack>
    </Card>
  );
}

export default NewNoteCard