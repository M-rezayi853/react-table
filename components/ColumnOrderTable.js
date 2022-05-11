import React, { useMemo } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useColumnOrder,
} from 'react-table'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  Container,
  Input,
  Select,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

import { COLUMNS } from './columns'
import { GlobalFilter } from './GlobalFilter'
import MOCK_DATA from './MOCK_DATA.json'

export const ColumnOrderTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
    setColumnOrder,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useColumnOrder
  )

  const { globalFilter, pageIndex, pageSize } = state

  const changeOrder = () => {
    setColumnOrder([
      'id',
      'first_name',
      'last_name',
      'phone',
      'country',
      'date_of_birth',
    ])
  }

  return (
    <Container maxW={'container.xl'} my='20'>
      <Button onClick={changeOrder}>Change column order</Button>

      <Box display='grid' gridTemplateColumns={'repeat(2, 1fr)'} mb='5'>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          boxShadow='sm'
          w={'50%'}
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>

        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Box>

      <TableContainer
        maxW={'container.xl'}
        mr='auto'
        ml={'auto'}
        mb='4'
        border={'1px'}
        borderColor={'blue.100'}
        borderRadius='md'
        boxShadow='md'
      >
        <Table {...getTableProps()} variant='striped' colorScheme={'cyan'}>
          <TableCaption
            bgGradient={'linear(to-r, teal.400, cyan.700)'}
            color='white'
            mt={'0'}
          >
            Imperial to metric conversion factors
          </TableCaption>
          <Thead bgGradient={'linear(to-r, cyan.400, blue.700)'}>
            {headerGroups.map((headerGroup) => (
              <Tr key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    key={column}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    color='white'
                    textAlign='center'
                  >
                    {column.render('Header')}
                    <Box as='span'>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDownIcon w='4' h={'4'} />
                        ) : (
                          <ChevronUpIcon w={'4'} h='4' />
                        )
                      ) : (
                        ''
                      )}
                    </Box>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return (
                <Tr key={row} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td
                        key={cell}
                        {...cell.getCellProps()}
                        textAlign='center'
                      >
                        {cell.render('Cell')}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>

          <Tfoot bgGradient={'linear(to-r, cyan.400, blue.700)'}>
            {footerGroups.map((footerGroup) => (
              <Tr key={footerGroup} {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <Td
                    key={column}
                    {...column.getFooterProps}
                    textAlign='center'
                    color={'white'}
                    fontSize='sm'
                    py={'2.5'}
                  >
                    {column.render('Footer')}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tfoot>
        </Table>
      </TableContainer>

      <Box
        display={'grid'}
        alignItems='center'
        gridTemplateColumns={'repeat(3, 1fr)'}
      >
        <Box display={'flex'}>
          <Box as='p' mr={'1'}>
            Page
          </Box>
          <Box as='p' fontWeight={'bold'}>
            {pageIndex + 1} of {pageOptions.length}
          </Box>{' '}
        </Box>

        <Box
          display={'flex'}
          justifyContent='center'
          alignItems={'center'}
          gap={'0.5'}
        >
          <Button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            size='sm'
            colorScheme='blue'
            boxShadow='md'
            px='3'
            py='5'
            borderRadius={'full'}
          >
            {'<<'}
          </Button>
          <Button
            onClick={() => previousPage()}
            size={'sm'}
            colorScheme='blue'
            disabled={!canPreviousPage}
            boxShadow='md'
            fontSize={'xs'}
            px='2'
            py='5'
            borderRadius={'full'}
          >
            Prev
          </Button>

          <Input
            type={'number'}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            textAlign='center'
            min={1}
            max={pageOptions.length}
            width='50px'
            size={'sm'}
            borderRadius='md'
          />

          <Button
            onClick={() => nextPage()}
            size={'sm'}
            colorScheme='blue'
            disabled={!canNextPage}
            boxShadow='md'
            fontSize={'xs'}
            px='2'
            py='5'
            borderRadius={'full'}
          >
            Next
          </Button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            size='sm'
            colorScheme='blue'
            boxShadow='md'
            px='3'
            py='5'
            borderRadius={'full'}
          >
            {'>>'}
          </Button>
        </Box>

        <Box display={'flex'} alignItems='center' justifyContent={'flex-end'}>
          <Box as='span' mr={'2'}>
            Go to page:{' '}
          </Box>
          <Input
            type={'number'}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            width='20'
            size={'sm'}
            borderRadius='md'
            min={0}
            max={pageOptions.length}
          />
        </Box>
      </Box>
    </Container>
  )
}
