import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useParams} from 'react-router-dom'
import AuthContext from '../../../store/authContext'

function UserProductDetailScreen() {
    const {token, userId} = useContext(AuthContext)
  let url = 'http://localhost:4545'

  //const {token, userId} = useContext(AuthContext)
  const [product, setProduct] = useState([])
  //const navigate = useNavigate(AuthContext)
  const {id} = useParams()

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


  return (
    <main>
    <div className="card" >
      <img className="card-img-top" src={product.img} alt={product.name}/>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <h4 className="card-title">{product.price}</h4>
        <p className="card-text">{product.desc}</p>
        <button>Edit Product</button>
      </div>
    </div>
    </main>
  )
}

export default UserProductDetailScreen