import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import AuthContext from '../../../store/authContext'

function CartScreen() {
  const {token, userId} = useContext(AuthContext)
  const {product, setProduct} = useState({})
 

  let url = "http://localhost:4545"

  useEffect(() => {
    console.log("product")
    axios.get(`${url}/carts/${userId}`, {
      headers: {
        authorization: token
      }
    })
    .then(res => console.log(res.data))
  }, [])

  console.log(product)


  return (
    <main>
  {product ? (<div className="card" >
      <img className="card-img-top" src={product.img} alt={product.name}/>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <h4 className="card-title">{product.price}</h4>
        <p className="card-text">{product.desc}</p>
        
      </div>
    </div>) : (null)}
    </main>
  )
}

export default CartScreen