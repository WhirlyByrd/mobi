import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import AuthContext from '../../store/authContext'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './ProductDetailScreen.css'


function ProductDetailScreen() {
  const {token, userId} = useContext(AuthContext)
  const [product, setProduct] = useState([])
  const navigate = useNavigate(AuthContext)
  const {id} = useParams()
  
  console.log(id)

  //view product by product id

  useEffect(() => {
    axios.get(`/products/${id}`)
    .then(res => setProduct(res.data[0]))
  }, [id])

  console.log(product)

  

  const addToCart = () => {
    
      axios.post(`/carts/product`, {productId:id, userId, quantity:1}, 
      {
          headers: {
            authorization: token
          }
      })
      .then(() => {
        navigate('/cart')
      })
      .catch(err => console.log(err))
  }


  return (
    <main>
      <Container className='container'>
        <Row className='details-container'>
        <Col><img className="card-img-top" src={product.img} alt={product.name}/></Col>
        <Col><div className="details">
        <h1 className="detail-name">{product.name}</h1>
        <h4 className="detail-price">${product.price}</h4>
        <p className="detail-text">{product.desc}</p>
        <Button variant='dark' onClick={() => addToCart(product)}>Add To Cart</Button>
      </div></Col>
        </Row>
      </Container>
    </main>
  )
}

export default ProductDetailScreen