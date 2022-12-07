import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../../store/authContext'
import {Form} from 'react-bootstrap'
import './AuthScreen.css'
 
const AuthScreen = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [email, setEmail] = useState('')
   const [register, setRegister] = useState(true)
   

   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()

       const body = {
        username,
        password,
        email
       }
 
      const url = 'http://localhost:4545'
      
      axios.post(register ? `${url}/register` : `${url}/login`, body)
      .then((res) => {
        console.log('After Authorization', res.data)
        authCtx.login(res.data.token, res.data.exp, res.data.userId)
      })
      .catch(err => {
        console.log(err)
        setPassword('')
        setUsername('')
        setEmail('')
      })
      console.log('submitHandler called')
   }
 
   return (
       <main>
            <div className='auth-form-container'>
            <div className="auth-form">  
           <h1>Welcome!</h1>
           <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3'>
               <Form.Control
                    required
                   className='form-input'
                   type='text'
                   placeholder='Username'
                   value={username}
                   onChange={e =>setUsername(e.target.value)}
                   />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Control
                    required
                   className='form-input'
                   type='email'
                   placeholder='Email'
                   value={email}
                   onChange={e =>setEmail(e.target.value)}
                   />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Control
                    required
                   className='form-input'
                   type='password'
                   placeholder='Password'
                   value={password}
                   onChange={e =>setPassword(e.target.value)}
                   />
            </Form.Group>
               
            <Form.Group className='mb-3'>

               <button className='dark-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
            </Form.Group>
           </Form>
           <button className='light-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up'}?</button>
           </div>
           </div>
       </main>
   )
}
 
export default AuthScreen