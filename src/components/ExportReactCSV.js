import React from 'react'
// export stuff
import {CSVLink} from 'react-csv'
// button function and styling
import Button from '@mui/material/Button';

export const ExportReactCSV = ({csvData, fileName}) => { return (
    <Button variant="light" size="sm">
      <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
    </Button>
  )
}
