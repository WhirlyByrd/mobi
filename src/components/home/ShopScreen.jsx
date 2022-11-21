import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import AuthContext from '../../store/authContext'
import './ShopScreen.css'

const ShopScreen = () => {

  const {userId} = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const navigate = useNavigate(AuthContext)
  const {id} = useParams()
  console.log(id)

  const goToDetail = (id) => {
        navigate(`/productDetail/${id}`)
  }


  //do not show own products on the shop screen
  useEffect(() => {
    axios.get('/products')
    .then(res => {
      if (userId) {
        const otherUsersProducts = res.data.filter(product => userId !== product.userId)
        setProducts(otherUsersProducts)
      } else {
        setProducts(res.data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }, [userId])

  console.log(products)

  //map through products
  const mappedProducts = products.map(product => {
    return (
      <div className="card" >
        <img className="card-img-top" src={product.img} alt={product.name}/>
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <h4 className="card-title">{product.price}</h4>
          <p className="card-text">{product.desc}</p>
          <button onClick={() => goToDetail(product.id)} className="btn btn-primary">
            See Details
          </button>
        </div>
      </div>
    );
  })


  return mappedProducts.length >= 1 ? (
    <main>
      {mappedProducts}
    </main>
  ) : (
    <main>
      <h1>There are no products yet</h1>
    </main>
  )
}

export default ShopScreen