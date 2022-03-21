import {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const Add = (props) => {
  // handling state
  const emptyItem = {name: '', category: '', description: '', cost: '', user: props.user}
  const [item, setItem] = useState(emptyItem)

  // function to handle the changes for our object
  const handleChange = (event) => {
    //  this line below is probably going to break ....
    setItem({...item, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(item)
  }

  return (
    <>
      <Box
        className = "form"
        onSubmit={handleSubmit}
        component="form"
        sx={{
          '& > :not(style)': {m:1},
        }}
        noValidate
      >

        <InputLabel htmlFor="name">Name</InputLabel>
        <OutlinedInput
        name="name"
        value={item.name}
        onChange={handleChange}
        />
        <InputLabel htmlFor='category'>Item Category: </InputLabel>
        <OutlinedInput
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
        <OutlinedInput type='number' value={item.cost} name='cost' onChange={handleChange}/>
        <Button type='submit'>Submit</Button>
      </Box>
    </>
  )
}

export default Add
