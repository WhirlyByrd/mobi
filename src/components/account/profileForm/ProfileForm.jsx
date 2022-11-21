import React, {useState, useContext} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../../store/authContext'
import {Form} from 'react-bootstrap'


function ProfileForm() {
  const {token, userId} = useContext(AuthContext)
  const navigate = useNavigate()

  

  return (
    <div>ProfileForm</div>
  )
}

export default ProfileForm