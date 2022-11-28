import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import AuthContext from '../../store/authContext'
import './ShopScreen.css'
import { Container, Card, Button} from 'react-bootstrap'

const ShopScreen = ({search}) => {

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
  const mappedProducts = products
  .filter(product => {
    if(search){
      return product.name.toLowerCase().includes(search.toLowerCase())
    } else {
      return product
    }
  })
  .map(product => {
    return (
      
      <Card className='card' key={product.id} >
        <Card.Img className="card-img-top" src={product.img} alt={product.name}/>
        <Card.Body>
       
          <Card.Title className="card-title">{product.name}</Card.Title>
          <h3 className="card-price">${product.price}</h3>
          
          <Button variant="dark" className='dark-btn'
          onClick={() => goToDetail(product.id)} >
            See Details
          </Button>
          </Card.Body>
       
      </Card>
    );
  })


  return mappedProducts.length >= 1 ? (
      <Container>
      <div className='cards'>
      {mappedProducts}   
      </div>
      </Container>
  ) : (
    
      <h1>There are no products yet</h1>
    
  )
}

export default ShopScreen