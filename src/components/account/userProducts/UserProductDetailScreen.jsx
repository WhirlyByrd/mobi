import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import AuthContext from '../../../store/authContext'
import { Form, Container, Row, Col } from 'react-bootstrap'
import './UserProductDetailScreen.css'

function UserProductDetailScreen() {
  const {token, userId} = useContext(AuthContext)
  const navigate = useNavigate(AuthContext)
  let url = 'http://localhost:4545'
  const {id} = useParams()
  

  const [product, setProduct] = useState({})

  

  //editing the product
  const [editing, setEditing] = useState(false)

  const [name, setName] = useState(product.name)
  const [desc, setDesc] = useState(product.desc)
  const [img, setImage] = useState(product.img)
  const [price, setPrice] = useState(product.price)

  


  useEffect(() => {
    console.log(token)
    axios.get(`${url}/userproduct/${id}/${userId}`, 
    {
    headers: {
        authorization: token
      }
    })
    .then(res => setProduct(res.data[0]))
  }, [])


  //update the product
  const updateProduct = e => {
    e.preventDefault()

    const body = {
      img,
      name,
      price,
      desc,
      productId: product.id
    }
    axios.put(`${url}/products/${id}`, body,
    {
      headers: {
        authorization: token
      }
    })
    .then(res => {
      setEditing(false)
      navigate('/userProducts')
    })
    .catch(err => console.log(err))
  
  }

  //delete the product

  const deleteProduct = (id) => {
   
    axios.delete(`${url}/products/${id}`, {
        headers: {
          authorization: token
        }
    })
    .then(() => {
      navigate('/userProducts')
    })
    .catch(err => console.log(err))
  }

  


  return (
    <main>
      <Container>
      {!editing ? (
        <Row className='details-container'>
          <Col>
          <img className="card-img-top" src={product.img} alt={product.name} />
          </Col>
          <Col>
          <div className="details">
            <h3 className="detail-name">{product.name}</h3>
            <h4 className="detail-price">${product.price}</h4>
            <p className="detail-text">{product.desc}</p>
          
            
            <button className='dark-btn' onClick={() => setEditing(!editing)}>Edit Product</button>
            
            <button onClick={() => deleteProduct(product.id)} className='delete-btn'>Delete Product</button>
            
            
          </div>
          </Col>
        </Row>
      ) : (
        <div className='form-container'>
      <div className="form">  
      <h1>Edit Product: {product.name}</h1>
        <Form onSubmit={updateProduct}>
          <Form.Group className='mb-3'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder={product.img}
            value={img}
            onChange={(e) => setImage(e.target.value)}
          />
          </Form.Group>
          <Form.Group className='mb-3'>
          <Form.Label>Product Name</Form.Label>

          <Form.Control
            type="text"
            placeholder={product.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </Form.Group>

          <Form.Group className='mb-3'>
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder={product.desc}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="decimal"
            placeholder={product.price}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />


          </Form.Group>
          <button className='dark-btn'>Update Product</button>
        </Form>
      </div>
      </div>
      )}
     </Container>
    </main>
  );
}

    
export default UserProductDetailScreen