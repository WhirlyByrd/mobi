import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import AuthContext from '../../store/authContext'


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
    
      axios.post(`/carts/item`, {productId:id, userId}, 
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
    <div className="card" >
      <img className="card-img-top" src={product.img} alt={product.name}/>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <h4 className="card-title">{product.price}</h4>
        <p className="card-text">{product.desc}</p>
        <button onClick={() => addToCart(product)}>Add To Cart</button>
      </div>
    </div>
    </main>
  )
}

export default ProductDetailScreen