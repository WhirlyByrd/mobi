import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import AuthContext from '../../store/authContext'
import './Header.css'
import {Container, Nav, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'





function Header() {

    const authCtx = useContext(AuthContext)
    
  

  return (
    <Nav class="navbar navbar-expand-lg fixed-top navbarScroll">
        <Container>
       
            <div class='brand'>
            <a class='logo' href="/"></a>   
            <a class="navbar-brand" href="/">Mobi</a>
            </div>
            
           

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            
            
            <Form className="d-flex ms-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
          
          
        <ul class="navbar-nav ">

        <li class="nav-link" >
        <NavLink class="nav-link"
        to='/cart'
        >Cart</NavLink>  
        </li>

        <li class="nav-link" >
        <NavLink class="nav-link"
        to='/account'
        >Profile</NavLink>  
        </li>

        <li class="nav-link" >
        <NavLink class="nav-link"
        to='/userProducts'
        >My Products</NavLink>  
        </li>

        <li class="nav-link" >
        <NavLink class="nav-link"
        to='/auth'
        >Login</NavLink>  
        </li>
       </ul>
       </div>
       
        
        </Container>
    </Nav>
  )
}

export default Header