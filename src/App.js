import {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'

import Edit from './components/Edit.js'
import Display from './components/Display.js'
import Add from './components/Add.js'
// MUI DEPENDENCIES
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ========= Modal Style ========= //
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: "#000",
    width: 800,
    height:800,
    bgcolor: 'background.paper',
    border: '5px solid #000',
    boxShadow: 24,
    p: 4,
  };

const App = () => {

  // state for items database
  const [items, setItems] = useState([]);

  //state for toggling edit
  const [showEdit, setShowEdit] = useState(false)

  //state for setting index for mapped items
  const [selectIndex, setSelectIndex] = useState(0)

  //Modal Open/Close State
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const getItems = () => {
    axios.get('https://mystuff-app.herokuapp.com/api/items')
    .then((response) => {
      setItems(response.data)
      setShowEdit(!response.data)
    }, (error) => {
      console.error(error)
    })
    .catch((error) => {
      console.error(error);
    })
  }
  // mack
  const handleCreate = (addItem) => {
    axios.post('https://mystuff-app.herokuapp.com/api/items', addItem)
      .then((response) => {
        console.log(response)
        getItems()
      })
      .catch((error) => {
        console.log(error.response.data );
  })
}

  const handleDelete = (id) => {
    axios.delete('https://mystuff-app.herokuapp.com/api/items/' + id)
      .then((response) => {
        getItems()
      })
  }

  const handleUpdate = (editItem) => {
    axios.put('https://mystuff-app.herokuapp.com/api/items/' + editItem.id, editItem)
    .then((res) => {
      setItems(
        items.map((item) => {
          return (
            item.id !==editItem.id ? item : editItem
          )
        })
      )
    })
  }

  const handleToggleEdit = (index) => {
    setShowEdit(!showEdit)
    setSelectIndex(index)
    console.log(showEdit)
    console.log(index)
    console.log(selectIndex)
  }

  useEffect(() => {
    getItems()
  }, [])


  return (
    <>
      <h1>My Stuff</h1>
      <Add handleCreate={handleCreate} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Cost</th>
            <th>More</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {items.map((item, index) => {
          return (
          <>
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>${item.cost}</td>
              <td>
                  <button>
                  <Box>
                            <MoreHorizIcon sx={{mr: 1}}color="primary" variant="contained" value="Submit" type='Modal' onClick={handleOpen}/>
                            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                              <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h2" component="h2"> Item Name
                                </Typography>
                                <img src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/4bc/a6e/49d49351c9b013bf9f34239c21.jpg" alt="nothing shown here"></img>
                                <Typography id="modal-modal-description" variant="p" component="p">This is where the description about the item will go, we can include details like cost here; otherwise if that seems too redundant we can just leave it out.
                                </Typography>
                              </Box>
                          </Modal>
                  </Box>
                  </button>
              </td>
              <td><button onClick={(event) => {handleToggleEdit(index)}}><CreateIcon/></button></td>
              <td><button onClick={()=>handleDelete(item.id)}><DeleteIcon  /></button></td>
            </tr>
            {showEdit && selectIndex === index ?
            <Edit handleUpdate={handleUpdate} item={item}/> : null}
          </>
          )
        })}
        </tbody>
      </table>

    </>
  )
}

export default App;
