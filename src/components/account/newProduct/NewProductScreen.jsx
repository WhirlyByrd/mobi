import React, {useState, useContext} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../../store/authContext'
import {Form} from 'react-bootstrap'
import './NewProductScreen.css'



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
      <div className='form-container'>
      <div className="form">  
    
      <h1>Create A New Product</h1>
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
        type='text'
        placeholder='Insert Image URL'
        value={img}
        onChange={e => setImage(e.target.value)}
        /> 
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
        type='text'
        placeholder='Enter Product Name'
        value={name}
        onChange={e => setName(e.target.value)}
        />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Product Description</Form.Label>
        <Form.Control
        as="textarea"
        type='text'
        placeholder='Enter Product Description'
        value={desc}
        onChange={e => setDesc(e.target.value)}
        />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Product Price</Form.Label>
        <Form.Control
        type='decimal'
        value={price}
        onChange={e => setPrice(e.target.value)}
        />
        </Form.Group>

        <button className='dark-btn'>Create Product</button>
      </Form>
      
      
     </div>
      </div>
    </main>
  )
}

export default NewProductScreen