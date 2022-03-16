import {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'
import Add from './components/Add'

const App = () => {

  const [items, setItems] = useState([]);

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
  // mack
  const handleCreate = (addItem) => {
    axios
      .post('https://mystuff-app.herokuapp.com/api/items', addItem)
      .then((response) => {
        console.log(response)
        getItems()
      })
  }

  useEffect(() => {
    getItems()
  }, [])


  return (
    <>
    <Add handleCreate={handleCreate} />
      <h1>My Stuff</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
        {items.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>${item.cost}</td>
            </tr>
          )
        })}
        </tbody>
      </table>

    </>
  )
}

export default App;
