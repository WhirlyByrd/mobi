import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import AuthContext from '../../../store/authContext'
import './UserProducts.css'
import {Button, Container, Row, Card, Col} from 'react-bootstrap'

function UserProductsScreen() {

  const {token, userId} = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(AuthContext);
  const id = useParams()


  

    

  const goToDetail = (id) => {
        navigate(`/userProductDetail/${id}`)
  }

  const newProduct = () => {
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
      <Card className="card" key={product.id}>
        <Card.Img className="card-img-top" src={product.img} alt={product.name}/>
        <Card.Body className="card-body">
          <Card.Title className="card-title">{product.name}</Card.Title>
          <h3 className="card-price">${product.price}</h3>
          <Button variant='secondary' onClick={() => goToDetail(product.id)} >
            See Details
          </Button>
        </Card.Body>
      </Card>
    );
  })




  return mappedProducts.length >= 1 ? (
    <main>
      <Container className='container'>
        <Row className='product-top-row'>
          <Col>
            <h1>My products</h1>
          </Col>
          <Col>
          <div className='new-product-btn'>  
            <Button variant="dark" onClick={newProduct}>
               + Add New Product
            </Button>
          </div>
          </Col>
        </Row>
        <div className="cards">{mappedProducts}</div>
      </Container>
    </main>
  ) : (
    <main>
      <Container>
      <Row className='product-top-row'>
          <Col>
            <h1>My products</h1>
          </Col>
          <Col>
          <div className='new-product-btn'>  
            <Button variant="dark" onClick={newProduct}>
               + Add New Product
            </Button>
          </div>
          </Col>
        </Row>
      <h2>You have no products yet</h2>
      </Container>
    </main>
  );
}


export default UserProductsScreen