import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import AuthContext from '../../../store/authContext'

function CartScreen() {
  const {token, userId} = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const {id} = useParams()

  
 

  let url = "http://localhost:4545"

  //view users cart items

  useEffect(() => {
    console.log("product")
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

  console.log(products)


const mappedProducts = products.map(product => {
    return (
      <div className="card" >
        <img className="card-img-top" src={product.img} alt={product.name}/>
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <h4 className="card-title">{product.price}</h4>
          <p className="card-text">{product.desc}</p>
          <button>
            Delete Item
          </button>
        </div>
      </div>
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