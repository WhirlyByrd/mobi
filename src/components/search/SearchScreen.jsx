import React from 'react'
import ShopScreen from '../home/ShopScreen'
import {useParams} from 'react-router-dom'
import {Row, Container} from 'react-bootstrap'


function SearchScreen() {
    const {search} = useParams()

  return (
    <main>
    <Container> 
    <Row className='product-top-row'>
        <h1> Search: {search} </h1>
     </Row>   
        <ShopScreen search={search}/>

    </Container>
   
    </main>
  )
}

export default SearchScreen