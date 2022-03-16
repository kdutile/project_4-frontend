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
    axios.post('https://mystuff-app.herokuapp.com/api/items', addItem)
      .then((response) => {
        console.log(response)
        getItems()
      })
      .catch((error) => {
        console.log(error.response.data );
  })
}

  const handleDelete = (event) => {
    axios.delete('https://mystuff-app.herokuapp.com/api/items/' + event.target.value)
      .then((response) => {
        getItems()
      })
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
          </tr>
        </thead>
        <tbody>
        {items.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>${item.cost}</td>
              <button onClick={handleDelete} value={item.id}>X</button>
            </tr>
          )
        })}
        </tbody>
      </table>

    </>
  )
}

export default App;
