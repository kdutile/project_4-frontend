import {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const Edit = (props) => {
  let selectedItem = {...props.item}
  const [item,setItem] = useState(selectedItem)

  const handleChange = (event) => {
    setItem({...item, [event.target.name]: event.target.value})
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()
    props.handleUpdate(item)
  }

  return(
      <tr key={item.id + '_edit'}>
        <td colSpan="7">
          <Box
            className="form"
            onSubmit = {handleEditSubmit}
            component="form"
            sx={{
              '& > :not(style)': { m:1 },
            }}
            noValidate
          >

              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
              className="input"
              name="name"
              value={item.name}
              onChange={handleChange}
              />


              <InputLabel htmlFor='category'>Item Category: </InputLabel>
              <OutlinedInput
              className="input"
              name="category"
              value={item.category}
              onChange={handleChange}
              />


              <InputLabel htmlFor='description'>Item Description: </InputLabel>
              <TextareaAutosize
              minRows={4}
              value={item.description}
              style={{width: 200}}
              name='description'
              onChange={handleChange}/>

              <InputLabel htmlFor='cost'>Item Cost: </InputLabel>
              <OutlinedInput
                className="input" type='number' value={item.cost} name='cost' onChange={handleChange}/>


              <Button type='submit'>Submit</Button>

          </Box>
        </td>
      </tr>
  )
}

export default Edit
