import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'

// export button
import {ExportReactCSV} from './components/ExportReactCSV'
// search function
import {Input} from 'semantic-ui-react'

import Edit from './components/Edit.js'
import Nav from './components/nav.js'
import Add from './components/Add.js'

// MUI DEPENDENCIES
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

  //state for toggling add form
  const [showAdd, setShowAdd] = useState(false)

  //state for setting index for mapped items
  const [selectIndex, setSelectIndex] = useState(0)

  const [selectItem, setSelectItem] = useState({})

  // state for search input and filtered data
const [searchInput, setSearchInput] = useState('')
const [filteredResults, setFilteredResults] = useState(null)

  //Modal Open/Close State
  const [open, setOpen] = useState(false);

  const handleOpen = (item) => {
    setSelectItem(item)
    setOpen(true);


  }
  const handleClose = () => {
    setOpen(false);
    setSelectItem({})
  }

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
  }
  
  const handleToggleAdd = () => {
    setShowAdd(!showAdd)
  }

// function that handles search functionality
// https://www.freecodecamp.org/news/build-a-search-filter-using-react-and-react-hooks/
  const searchItems = (searchValue) => {
    // console.log(searchValue)
    if (searchValue !== '') {
      const filteredData = items.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
        // filter out 'items' state, use Object.values to get values from object item, convert into string, change string values to lowercase, check if this string includes input that we typed into search bar
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(null)
    }
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <>
    <Nav handleToggleAdd={handleToggleAdd}/>

    {/*//Make search it's own component and stick in the nav??*/}
    <Input icon="search"
         placeholder="Search..."
         onChange={(e) => searchItems(e.target.value)}/>
         <ExportReactCSV csvData={items} fileName="my_stuff.csv" />

    {showAdd ? <Add handleToggleAdd={handleToggleAdd} handleCreate={handleCreate} /> :
        <>
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
            {/*=======Mak's search ternary!=========*/}
            { filteredResults ? (filteredResults.map((item, index) => {
              return (
                 <React.Fragment key={item.id}>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>${item.cost}</td>
                    <td>
                            <MoreHorizIcon className="clickIcon" sx={{mr: 1}}color="primary" variant="contained" value="Submit" type='Modal' onClick={()=>{handleOpen(item)}} />
                            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                              <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h2" component="h2">{selectItem.name}
                                </Typography>
                                <img src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/4bc/a6e/49d49351c9b013bf9f34239c21.jpg" alt="nothing shown here"></img>
                                <Typography id="modal-modal-description" variant="p" component="p">{selectItem.description}
                                </Typography>
                              </Box>
                            </Modal>
                    </td>
                    <td><CreateIcon className="clickIcon" onClick={(event) => {handleToggleEdit(index)}}/></td>
                    <td><DeleteIcon className="clickIcon" onClick={()=>handleDelete(item.id)}  /></td>
                  </tr>
                  {showEdit && selectIndex === index ?
                  <Edit handleUpdate={handleUpdate} item={item}/> : null}
                </React.Fragment>
              )
            })) : items.map((item, index) => {
              return (
               <React.Fragment key={item.id}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>${item.cost}</td>
                  <td>
                          <MoreHorizIcon className="clickIcon" sx={{mr: 1}}color="primary" variant="contained" value="Submit" type='Modal' onClick={()=>{handleOpen(item)}} />
                          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                            <Box sx={modalStyle}>
                              <Typography id="modal-modal-title" variant="h2" component="h2">{selectItem.name}
                              </Typography>
                              <img src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/4bc/a6e/49d49351c9b013bf9f34239c21.jpg" alt="nothing shown here"></img>
                              <Typography id="modal-modal-description" variant="p" component="p">{selectItem.description}
                              </Typography>
                            </Box>
                          </Modal>
                  </td>
                  <td><CreateIcon className="clickIcon" onClick={(event) => {handleToggleEdit(index)}}/></td>
                  <td><DeleteIcon className="clickIcon" onClick={()=>handleDelete(item.id)}  /></td>
                </tr>
                {showEdit && selectIndex === index ?
                <Edit handleUpdate={handleUpdate} item={item}/> : null}
              </React.Fragment>
              )
            })
            }
            </tbody>
          </table>
        </>
    }
    </>
  )
}

export default App;
