import React, {useState, useContext} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../../store/authContext'
import {Form} from 'react-bootstrap'



function NewProductScreen() {
  const {token, userId} = useContext(AuthContext)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImage] = useState('')
  const [price, setPrice] = useState(0)
  //decimal?
  
  let url = 'http://localhost:4545'

  const handleSubmit = e => {
    e.preventDefault()
    
    axios.post(`${url}/products`, {img, name, desc, price, userId}, 
    {
      headers: {
        authorization: token
      }
    })
    .then(()=> {
      navigate('/userProducts')
    })
    .catch(err => console.log(err))
  }



  return (
    <main>
      <Form onSubmit={handleSubmit} >

        <input
        type='text'
        placeholder='Insert Image URL'
        value={img}
        onChange={e => setImage(e.target.value)}
        /> 
        <input
        type='text'
        placeholder='Enter Product Name'
        value={name}
        onChange={e => setName(e.target.value)}
        />
        <textarea
        type='text'
        placeholder='Enter Product Description'
        value={desc}
        onChange={e => setDesc(e.target.value)}
        />
        <input
        type='decimal'
        placeholder='Enter Product Price'
        value={price}
        onChange={e => setPrice(e.target.value)}
        />
        <button>Create Product</button>
      </Form>
    </main>
  )
}

export default NewProductScreen