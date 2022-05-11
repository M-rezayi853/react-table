import React, { useMemo } from 'react'
import { useTable } from 'react-table'
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
} from '@chakra-ui/react'

// import { COLUMNS, GROUPED_COLUMNS } from './columns'
import { COLUMNS } from './columns'
import MOCK_DATA from './MOCK_DATA.json'

export const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <>
      <TableContainer
        maxW={'container.xl'}
        mr='auto'
        ml={'auto'}
        my='20'
        border={'1px'}
        borderColor={'blue.100'}
        borderRadius='md'
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
                    {...column.getHeaderProps()}
                    color='white'
                    textAlign='center'
                  >
                    {column.render('Header')}
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
