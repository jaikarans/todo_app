import { Box, Button, Center, Heading, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Logic = () => {
  const [value , setValue] = useState<number>(0)

  const handleIncrease = ()=>{
    setValue(value+1);
  }

  console.log("GHUS")

  return (
    <VStack>

   <Center >
     <Heading fontWeight={'bold'}>
        {value}
     </Heading>
   </Center>
     <Button variant="solid" colorScheme="green" onClick={handleIncrease}>
      Increase
     </Button>
    </VStack>
  )
}

export default Logic