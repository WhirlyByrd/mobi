import React from 'react'
import './ProductCard.css'

function ProductCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Product Name</Card.Title>
        <Card.Text>
          <h3>$Price</h3>
          <h4>Seller: username</h4>  
          Product description goes here.
        </Card.Text>
        <Button variant="primary">Go Bid</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard