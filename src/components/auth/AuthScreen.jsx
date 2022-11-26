import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../../store/authContext'
 
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
           <h1>Hello!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>


               <input
                   className='form-input'
                   type='text'
                   placeholder='Username'
                   value={username}
                   onChange={e =>setUsername(e.target.value)}
                   />
                <input
                   className='form-input'
                   type='text'
                   placeholder='Email'
                   value={email}
                   onChange={e =>setEmail(e.target.value)}
                   />
                <input
                   className='form-input'
                   type='text'
                   placeholder='Password'
                   value={password}
                   onChange={e =>setPassword(e.target.value)}
                   />
               
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default AuthScreen