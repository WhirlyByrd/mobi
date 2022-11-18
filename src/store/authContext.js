import { useState, createContext, useCallback, useEffect } from 'react'

let logoutTimer

//creates the context object to be used through app to store global values
const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null,
  username: null,
  email: null
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedExp = localStorage.getItem('exp')
  const storedId = localStorage.getItem('userId')
  const storedEmail = localStorage.getItem('email')
  const storedUsername = localStorage.getItem('username')
  

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    return null
  }


  return {
    token: storedToken,
    duration: remainingTime,
    userId: +storedId,
    email: storedEmail,
    username: storedUsername
  }
}



export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialToken
  let initialId
  let initialEmail
  let initialUsername
  if (localData) {
    initialToken = localData.token
    initialId = localData.userId
    initialEmail = localData.email
    initialUsername = localData.username
  }

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(initialId)
  const [email, setEmail] = useState(initialEmail)
  const [username, setUsername] = useState(initialUsername)


  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setEmail(null)
    setUsername(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('exp')
    localStorage.removeItem('email')
    localStorage.removeItem('username')

    if(logoutTimer){
      clearTimeout(logoutTimer)
    }
  }, [])

  const login = (token, exp, userId) => {
      setToken(token)
      setUserId(userId)
      setEmail(email)
      setUsername(username)
      localStorage.setItem('token', token)
      localStorage.setItem('userId',userId)
      localStorage.setItem('exp', exp)
      localStorage.setItem('email', email)
      localStorage.setItem('username', username)

      const remainingTime = calculateRemainingTime(exp)

      logoutTimer = setTimeout(logout, remainingTime)
  }

  useEffect(() => {
    if (localData) {
      logoutTimer = setTimeout(logout, localData.duration)
      //'refresh sets userId to null', 
      //saved it to state as a number to render
      let storedId = localStorage.getItem('userId')
      setUserId(+storedId)
    }
  }, [localData, logout])

  const contextValue = {
    token,
    login,
    logout, 
    userId,
    username, 
    email
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext