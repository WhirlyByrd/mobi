import React from 'react'
import {Container} from 'react-bootstrap'
import './AdBanner.css'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../../store/authContext'

function AdBanner() {
  const navigate = useNavigate(AuthContext)

  const goToMakeProduct = () => {
    navigate('/newProduct')
  }

  return (
    <Container>
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Sell Your Stuff!</h1>  
        <p className="col-md-8 fs-4"> Mobi is a marketplace for those who crave something different. Built with small-business owners in mind, Mobi lets you buy or sell unique items. </p>
        <button className="btn btn-light btn-lg" type="button" onClick={() => goToMakeProduct()}>Sell Something!</button>
      </div>
    </div>
    </Container>
  )
}

export default AdBanner