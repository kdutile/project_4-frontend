import {useState} from 'react'

const Add = (props) => {
  // handling state
  const emptyItem = {name: '', category: '', description: '', cost: ''}
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={item.name} onChange={handleChange}/>
        <label htmlFor="category">Category: </label>
        <input type="text" name="category" value={item.category} onChange={handleChange}/>
        <label htmlFor="description">Description: </label>
        <input type="text" name="description" value={item.description} onChange={handleChange}/>
        <label htmlFor="cost">Cost: </label>
        <input type="number" name="cost" value={item.cost} onChange={handleChange}/>
        <input type="submit" />
      </form>
    </>
  )
}

export default Add
