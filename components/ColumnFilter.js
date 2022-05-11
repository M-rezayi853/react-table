import React from 'react'
import { FormControl, Input, Container } from '@chakra-ui/react'

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column

  return (
    <Container align='center' mb={'2'}>
      <FormControl>
        <Input
          type={'text'}
          id='filter'
          value={filterValue || ''}
          onChange={(e) => setFilter(e.target.value)}
          placeholder='search ...'
          boxShadow='sm'
          bg={'white'}
          color='gray.600'
          size='sm'
          borderRadius={'md'}
        />
      </FormControl>
    </Container>
  )
}
