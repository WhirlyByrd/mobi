import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import AuthContext from '../../store/authContext'
import './Header.css'
import {Container, Nav, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'





function Header() {

    const authCtx = useContext(AuthContext)
    
  return (
    <Nav className="navbar navbar-expand-lg fixed-top navbarScroll">
        <Container>
       
            <div className='brand'>
            <a className='logo' href="/"></a>   
            <a className="navbar-brand" href="/">Mobi</a>
            </div>
            
           

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            
            <Form className="d-flex ms-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
          
        <nav>
       { 
       authCtx.token ? (
       <ul className="navbar-nav ">

        <li className="nav-link" >
        <NavLink className="nav-link"
        to='/cart'
        >CART</NavLink>  
        </li>

        <li className="nav-link" >
        <NavLink className="nav-link"
        to='/account'
        >PROFILE</NavLink>  
        </li>

        <li className="nav-link" >
        <NavLink className="nav-link"
        to='/userProducts'
        >MY PRODUCTS</NavLink>  
        </li>

        <li className="nav-link" >
        <NavLink className="nav-link"
        to='/auth'
        >LOGOUT</NavLink>  
        </li>
       </ul>
       ) : (
        <ul className="navbar-nav ">
        <li className="nav-link" >
        <NavLink className="nav-link"
        to='/auth'
        >LOGIN</NavLink>  
        </li>
        </ul>
       )
       }

       </nav>
       </div>
       
        
        </Container>
    </Nav>
  )
}

export default Header