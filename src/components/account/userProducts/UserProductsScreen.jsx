import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../../store/authContext'
import './UserProducts.css'
import {button} from 'react-bootstrap'

function UserProductsScreen() {

  const {userId} = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const navigate = useNavigate(AuthContext)

  const goToDetail = () => {
        navigate('/productDetail')
  },

  newProduct = () => {
    navigate('/newProduct')
  }

  //view only the user's products

  useEffect(() => {
    axios.get('/products')
    .then(res => {
      if (userId) {
        const userProducts = res.data.filter(product => userId === product.userId)
        setProducts(userProducts)
      } else {
        setProducts(res.data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }, [userId])

  console.log(products)

//map throught the products
const mappedProducts = products.map(product => {
    return (
      <div className="card" >
        <img className="card-img-top" src={product.img} alt={product.name}/>
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <h4 className="card-title">{product.price}</h4>
          <p className="card-text">{product.desc}</p>
          <button onClick={goToDetail} >
            See Details
          </button>
        </div>
      </div>
    );
  })




  return mappedProducts.length >= 1 ? (
    <main>
      <div><h1>My products</h1><button onClick={newProduct} >Add New Product</button></div>
      <div>{mappedProducts}</div>
    </main>
  ) : (
    <main>
      <div><h1>My products</h1><button onClick={newProduct}>Add New Product</button></div>
      <h2>You have no products yet</h2>
    </main>
  )
}


export default UserProductsScreen