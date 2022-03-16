import {useState, useEffect} from 'react'

const Add = (props) => {
  const emptyItem = {name: '', category: '', cost: ''}
  const [item, setItem] = useState(emptyItem)
  return (
    <>
      <form>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" />
        <label htmlFor="category">Category: </label>
        <input type="text" name="category" />
        <label htmlFor="cost">Cost: </label>
        <input type="number" name="cost" />
        <input type="submit" />
      </form>
    </>
  )
}

export default Add
