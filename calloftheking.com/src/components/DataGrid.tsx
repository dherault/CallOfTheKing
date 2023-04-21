import { DateTime } from 'luxon'

import Button from '~components/Button'

type DataGridPropsType = {
  columns: string[]
  rows: any[]
  actions: {
    [key: string]: (row: any) => void
  }
}

const timestampColumns = ['createdAt', 'updatedAt']

function DataGrid({ columns, rows, actions }: DataGridPropsType) {

  return (
    <table className="text-sm w-full">
      <thead className="bg-gray-100">
        <tr>
          {columns.map(column => (
            <th
              key={column}
              className="text-gray-700 text-left px-2 py-1"
            >
              {column}
            </th>
          ))}
          <th className="text-gray-700 text-left px-2 py-1">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            {columns.map(column => (
              <td
                key={column}
                className="py-1 px-2"
              >
                {timestampColumns.includes(column) ? DateTime.fromISO(row[column]).toFormat('dd LLLL yyyy HH:mm') : row[column]}
              </td>
            ))}
            <td className="py-1 px-2">
              <div className="flex gap-2">
                {Object.entries(actions).map(([actionName, action], index) => (
                  <Button
                    small
                    key={index}
                    onClick={action}
                  >
                    {actionName}
                  </Button>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataGrid
