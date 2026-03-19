import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DataTable({ columns, data, search = true, pagination = true, onRowClick, className }) {
  const [searchTerm, setSearchTerm] = React.useState('')
  
  const filteredData = data.filter(row => 
    columns.some(col => 
      row[col.accessor]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className={className}>
      {search && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      <div className="rounded-2xl border bg-card-bg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessor} className="w-[150px]">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={row.id || index} onClick={() => onRowClick?.(row)} className="cursor-pointer hover:bg-muted/50">
                {columns.map((column) => (
                  <TableCell key={column.accessor} className="font-medium">
                    {column.render ? column.render(row[column.accessor], row) : row[column.accessor] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-between py-4">
          <div className="text-secondary-text text-sm">
            Showing {filteredData.length} of {data.length} rows
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      )}
    </div>
  )
}
