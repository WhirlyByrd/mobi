import React, {useState, useContext} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../store/authContext'

function NewProductScreen() {
  const {token, userId} = useContext(AuthContext)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [SKU, setSKU] = useState('')
  //decimal?
  const [price, setPrice] = useState(00,00)



  return (
    <main>
      <form>
        
      </form>
    </main>
  )
}

export default NewProductScreen