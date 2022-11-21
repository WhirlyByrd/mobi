import React from 'react'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../store/authContext'


function AccountScreen() {

  const navigate = useNavigate(AuthContext)

  const goToProducts = () => {
    navigate('/userProducts')
  }


  return (
    <main>
      <div>
        <h1>My Profile</h1>
      </div>
      <div>
        <button onClick={goToProducts}>My Products</button>
      </div>
    </main>
    
  )
}

export default AccountScreen