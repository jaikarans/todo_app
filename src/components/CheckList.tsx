import { Button, Checkbox, Editable, EditableInput, EditablePreview, HStack, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons';


type CheckListProps = {
  id: number;
  uid: number;
  taskString: string;

}

const CheckList:React.FC<CheckListProps> = ({uid, taskString}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [bodyBg, setBodyBg] = useState<string>('BlackAlpha.200');
  const [lineThroughText, setLineThroughText] = useState<string>('none')
  const [editTextDisable, setEditTextDisable] = useState<boolean>(false)


  const handleCheckBoxChange = () => {
    // when checkbox is checked if will get executed
    if (isChecked === false) {
      setIsChecked(!isChecked)
      setBodyBg('green.100')
      // cuts the text with line when checkbox is checked means task is completed
      setLineThroughText('line-through')
      // don't allow user to edit the text when checkbox is checked
      setEditTextDisable(!editTextDisable)
    } else {
      setIsChecked(!isChecked)
      setBodyBg('BlackAlpha.200')
      setLineThroughText('none')
      setEditTextDisable(!editTextDisable)
    }
  }

  return (
    <HStack mx='2' mb='0.2' p={1} boxSize="full"  bg={bodyBg} borderRadius={10}  borderWidth={1} borderColor='grey'>
      <Checkbox isChecked={isChecked} onChange={handleCheckBoxChange} colorScheme={'green'} borderColor={'green.200'} _hover={{borderColor: "green.300"}} px={1} />
      <Editable isDisabled={editTextDisable} selectAllOnFocus={false} width={'full'} value={taskString}>
        <EditablePreview textDecorationLine={lineThroughText} shadow={'none'} fontFamily={'cursive'} width={'full'} />
        <EditableInput _focus={{ boxShadow: "none", }} fontFamily='cursive'/>
      </Editable>
      <IconButton
          aria-label="Search database"
          icon={<DeleteIcon />}
          size='xs'
          rounded="full"
          bg="orange.400"
          _hover={{bg: "orange.500"}}
        />
    </HStack>
  )
}

export default CheckList