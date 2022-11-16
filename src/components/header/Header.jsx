import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import AuthContext from '../../store/authContext'
import './Header.css'
import {Container, Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Mobi from '../../assets/whale.png'




function Header() {

    const authCtx = useContext(AuthContext)
    
  

  return (
    <Nav class="navbar navbar-expand-lg fixed-top navbarScroll">
        <Container>
        {/* <Navbar.Brand href="#home">
            <img 
              src="../assets/whale.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Mobi"
            />   
            </Navbar.Brand>  */}
            <div class='brand'>
            <a class='logo' href="/"></a>   
            <a class="navbar-brand" href="/">Mobi</a>
            </div>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
    
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