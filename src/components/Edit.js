import {useState} from 'react'


const Edit = (props) => {
  let nullItem = {...props.item}
  const [item,setItem] = useState(nullItem)

  const handleChange = (event) => {
    setItem({...item, [event.target.name]: event.target.value})
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()
    props.handleUpdate(item)
  }

  return(
        <td colSpan="6">
          <form onSubmit = {handleEditSubmit}>
              <label htmlFor='name'>Item Name: </label>
              <input type='text' value={item.name} name='name' onChange={handleChange}/>
              <label htmlFor='category'>Item Category: </label>
              <input type='text' value={item.category} name='category' onChange={handleChange}/>

          {/*<td>
            <form onSubmit = {handleEditSubmit}>
              <label htmlFor='description'>Item Description: </label>
              <textarea value={item.description} name='description' onChange={handleChange}/>
            </form>
          </td>*/}

              <label htmlFor='cost'>Item Cost: </label>
              <input type='number' value={item.cost} name='cost' onChange={handleChange}/>
              <input type='submit'/>
          </form>
        </td>
  )
}

export default Edit
