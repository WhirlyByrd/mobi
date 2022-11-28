import {useState, useEffect, useContext, useCallback} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import AuthContext from '../../../store/authContext'
import {Container, Col, Row, Card, Button, Image} from 'react-bootstrap'
import './CartScreen.css'

function CartScreen() {
  const {token, userId} = useContext(AuthContext)
  const [products, setProducts] = useState([])
  
  
  
  let url = "http://localhost:4545"

  //get products
  const getProducts = useCallback(() => {
    axios.get(`${url}/carts/${userId}`, {
      headers: {
        authorization: token
      }
    })
    .then(res => {
      console.log(res)
      if (userId) {
        const cartProducts = res.data.filter(product => userId === product.userId)
        setProducts(cartProducts) 
      } else {
        setProducts(res.data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }, [userId])
  

  //delete product
  const deleteCartItem = (cartId) => {
    
    axios.delete(`${url}/carts/${cartId}`, {
      headers: {
        authorization: token
      }
    })
      .then(() => {
        getProducts()
      })
      .catch(err => {console.log(err)})
  }

  //update quantity of product & price?
  const editCart = (cartId, quantity) => {

    //let price = 
    
    axios.put(`${url}/carts/${cartId}`, {quantity}, {
      headers: {
        authorization: token
      }
    })
    .then(() => {
      getProducts()
    })
  }



  useEffect(() => {
    getProducts()
  }, [])
  
  useEffect(() => {
    deleteCartItem()
  }, [])

  console.log(products)


const mappedProducts = products.map(product => {
    console.log(product)
    return (
     
      <Container key={product.cartId} >
      <Row className='d-flex align-items-center justify-content-center'>
      <Col lg={3}>
      <Image className='card-img-top' src={product.img} alt={product.name}/>
      </Col>
      <Col lg>
        <Row>

          <Col>
          <h1 className='card-title'>{product.name}</h1>
          
          </Col>
          <Col>
          
          </Col>
        </Row>
          <div className='card-btn-row'>
          <h4>${(product.price * product.quantity).toFixed(2)}</h4>
          <div className='quantity-btns'>
          <Button variant="secondary" onClick={() => editCart(product.cartId, +product.quantity + 1)}>+</Button>
          <div className='quantity'>{product.quantity}</div>
          {product.quantity <= 1 ? (null) : (<Button variant="secondary" onClick={() => editCart(product.cartId, +product.quantity - 1)}>-</Button>)} 
          </div>
          <Button variant="secondary" onClick={() => deleteCartItem(product.cartId)}>Delete</Button>
          </div>
          
      </Col>
      <hr class="solid"></hr>        
          </Row>
          
      </Container>
     
    );
  })

  return mappedProducts.length >= 1 ? (
    <main>
      <Container>
      <Row className='product-top-row'>
     
        <h1>My Cart</h1>
      </Row>
     
      <Row>
      <Col lg={8}>
        {mappedProducts}
      </Col>
    
     <Col lg={4}>
     
      <Container className='cart-summary'>
        <Card.Title>Cart Summary</Card.Title>
        <p>By clicking check out, I agree to the terms & conditions and understand that all sales are final. Some restrictions apply for free shipping. Any applicable discounts or coupons will be reflected at checkout.
        </p>
        <hr class="solid"></hr>
        <div>
          <Row>
            <Col>
          <h3>Subtotal</h3>
            
            </Col>
            <Col>
          <h3 className='subtotal'>${(products.reduce((total, el) => total + (el.price * el.quantity), 0).toFixed(2))}</h3>
            </Col>
          </Row>
          <hr class="solid"></hr>
          <Button variant="dark">Check Out</Button>
        </div>

      </Container>
     </Col>
     </Row>
      
    
      
      </Container>
    </main>
  ) : (
    <main>
      <Container>
      <Row className='product-top-row'> 
      <h1>My Cart</h1>
      </Row>
      <h2>Your cart is currently empty</h2>
      </Container>
    </main>
  )
}

export default CartScreen