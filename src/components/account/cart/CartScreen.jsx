import {useState, useEffect, useContext, useCallback} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import AuthContext from '../../../store/authContext'
import {Card, Button} from 'react-bootstrap'

function CartScreen() {
  const {token, userId} = useContext(AuthContext)
  const [products, setProducts] = useState([])
  //const [quantity, setQuantity] = useState(1)
  
  
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

  //update quantity of product, if same product id is added (add that to quantity field)

  //if + button add 1, if - button subtract 1
  // let incrementQuantity = () => setQuantity(quantity + 1);
  // let decrementQuantity = () => setQuantity(quantity - 1);
  //   if (quantity <= 0) {
  //   decrementQuantity = () => setQuantity(1)
  //     }

  

  const editCart = (cartId, quantity) => {
    
    axios.put(`${url}/carts/${cartId}`, {quantity}, {
      headers: {
        authorization: token
      }
    })
    .then(() => {
      getProducts()
    })
  }

  //add price total of all products in cart

  //clear cart
 
  //can I add more functions to useEffect
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
     
        
      <Card style={{ width: '20rem' }} key={product.cartId} >
      
        <img className="card-img-top" src={product.img} alt={product.name}/>
        <div className="card-body">
          <Card.Title>{product.name}</Card.Title>
          <h4 className="card-title">${product.price}</h4>
          <Card.Text className="card-text">{product.desc}</Card.Text>




          <Button onClick={() => editCart(product.cartId, +product.quantity + 1)}>+</Button>
          <Card.Text className="card-text">{product.quantity}</Card.Text>

          {product.quantity <= 1 ? (null) : (<Button onClick={() => editCart(product.cartId, +product.quantity - 1)}>-</Button>)} 
          
          <Button onClick={() => deleteCartItem(product.cartId)}>Delete</Button>
        </div>
      </Card>
     
    );
  })

  return mappedProducts.length >= 1 ? (
    <main>
      <div><h1>My Cart</h1></div>
      <div>{mappedProducts}</div>
    </main>
  ) : (
    <main>
      <div><h1>My Cart</h1></div>
      <h2>Cart is empty</h2>
    </main>
  )
}

export default CartScreen