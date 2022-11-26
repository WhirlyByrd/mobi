import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import AuthContext from '../../../store/authContext'
import { Form, Card, Button } from 'react-bootstrap'

function UserProductDetailScreen() {
  const {token, userId} = useContext(AuthContext)
  const navigate = useNavigate(AuthContext)
  let url = 'http://localhost:4545'
  const {id} = useParams()
  

  const [product, setProduct] = useState({})

  

  //editing the product
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(product.name)
  const [desc, setDesc] = useState(product.desc)
  const [img, setImage] = useState(product.img)
  const [price, setPrice] = useState(product.price)

  //price comes in as a NaN, how do I have it come in as a number?
  

  const updateProduct = e => {
    e.preventDefault()

    const body = {
      img,
      name,
      price,
      desc,
      productId: product.id
    }
    axios.put(`${url}/products/:id`, body,
    {
      headers: {
        authorization: token
      }
    })
    .then(() => {
      setEditing(false)
      navigate('/userProducts')
    })
    .catch(err => console.log(err))
  
  }

  // const deleteProduct = (id) => {
   
  //   axios.delete(`${url}/products/${id}`, {
  //       headers: {
  //         authorization: token
  //       }
  //   })
  //   .then(() => {
  //     navigate('/userProducts')
  //   })
  //   .catch(err => console.log(err))
  // }

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
      {!editing ? (
        <Card>
          <img className="card-img-top" src={product.img} alt={product.name} />
          <div className="card-body">
            <h3 className="card-title">{product.name}</h3>
            <h4 className="card-title">{product.price}</h4>
            <p className="card-text">{product.desc}</p>
            <Button onClick={() => setEditing(!editing)}>Edit Product</Button>
            <Button >Delete Prouct</Button>
          </div>
        </Card>
      ) : (
        <Form onSubmit={updateProduct()}>
          <input
            type="text"
            placeholder={product.img}
            value={img}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="text"
            placeholder={product.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            placeholder={product.desc}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="decimal"
            placeholder={product.price}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button type='submit'>Update Product</Button>
        </Form>
      )}
    </main>
  );
}

    
export default UserProductDetailScreen