import {useState} from 'react'
import Card from '@mui/material/Card';
import Edit from './Edit.js'

const Display = (props) => {

  return (
    <Card variant="outlined">
      <Edit handleUpdate={props.handleUpdate} items={props.items}/>
    </Card>
  )
}

export default Display
