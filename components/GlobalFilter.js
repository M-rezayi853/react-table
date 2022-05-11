import React, { useState } from 'react'
import { FormControl, Input, Container } from '@chakra-ui/react'
import { useAsyncDebounce } from 'react-table'

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined)
  }, 1500)

  return (
    <FormControl display={'flex'} justifyContent='flex-end'>
      <Input
        type={'text'}
        id='filter'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder='search ...'
        boxShadow='sm'
        w={'50%'}
      />
    </FormControl>
  )
}
