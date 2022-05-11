import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
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
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

// import { COLUMNS, GROUPED_COLUMNS } from './columns'
import { COLUMNS } from './columns'
import { GlobalFilter } from './GlobalFilter'
import MOCK_DATA from './MOCK_DATA.json'

export const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  )

  const { globalFilter } = state

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <TableContainer
        maxW={'container.xl'}
        mr='auto'
        ml={'auto'}
        mb='20'
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
            {rows.map((row) => {
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
                  >
                    {column.render('Footer')}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  )
}
