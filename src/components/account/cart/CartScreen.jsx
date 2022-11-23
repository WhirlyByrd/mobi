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
     
        
      <Card style={{ width: '18rem' }} key={product.cartId} >
      
      <Image className='card-image' src={product.img} alt={product.name}/>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <h4 className="card-title">${product.price * product.quantity}</h4>
          <Card.Text className="card-text">{product.desc}</Card.Text>
          </Card.Body>

          <div className='card-btn-row'>
          <div className='quantity-btns'>
          <Button variant="secondary" onClick={() => editCart(product.cartId, +product.quantity + 1)}>+</Button>
          
          <div className='quantity'>{product.quantity}</div>
          

          {product.quantity <= 1 ? (null) : (<Button variant="secondary" onClick={() => editCart(product.cartId, +product.quantity - 1)}>-</Button>)} 
          </div>
          
          <Button variant="secondary" onClick={() => deleteCartItem(product.cartId)}>Delete</Button>
          </div>
       
      </Card>
     
    );
  })

  return mappedProducts.length >= 1 ? (
    <main>
      <Container>
        
      <div className='cart-items'>

      <div className='title'>
        <h1>My Cart</h1>
      </div>
      
      <div>
        {mappedProducts}
      </div>

      </div>
     

      <Card className='cart-summary'>
        <Card.Title>Cart Summary</Card.Title>
        <Card.Text>By clicking check out, I agree to the terms & conditions and understand that all sales are final. Some restrictions apply for free shipping. Any applicable discounts or coupons will be reflected at checkout.
        </Card.Text>

        <div>
          <Card.Subtitle>Subtotal</Card.Subtitle>
          <Card.Text>${products.reduce((total, el) => total + (el.price * el.quantity), 0)}</Card.Text>
          <Button variant="dark">Check Out</Button>
        </div>

      </Card>
      
    
      
      </Container>
    </main>
  ) : (
    <main>
      <Container>
      <div><h1>My Cart</h1></div>
      <h2>Cart is empty</h2>
      </Container>
    </main>
  )
}

export default CartScreen