import {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'
import Edit from './components/Edit.js'
import Display from './components/Display.js'

// MUI DEPENDENCIES
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Modal from '@mui/material/Modal';

const App = () => {

  // state for items database
  const [items, setItems] = useState([]);

  //state for toggling edit
  const [showEdit, setShowEdit] = useState(false)

  //state for setting index for mapped items
  const [selectIndex, setSelectIndex] = useState(0)


  const getItems = () => {
    axios.get('https://mystuff-app.herokuapp.com/api/items')
    .then((response) => {
      setItems(response.data)
    }, (error) => {
      console.error(error)
    })
    .catch((error) => {
      console.error(error);
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

  useEffect(() => {
    getItems()
  }, [])


  return (
    <>
      <h1>My Stuff</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
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
              <td>${item.cost}</td>
              <td><button><MoreHorizIcon /></button></td>
              <td><button onClick={(event) => {handleToggleEdit(index)}}><CreateIcon/></button></td>
              <td><button><DeleteIcon /></button></td>
            </tr>
            <tr key={item.id + '_edit'}>
            <Edit handleUpdate={handleUpdate} item={item}/>
            </tr>
          </>
          )
        })}
        </tbody>
      </table>
    </>
  )
}

export default App;
