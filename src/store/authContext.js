import { useState, createContext, useCallback, useEffect } from 'react'

let logoutTimer

//creates the context object to be used through app to store global values
const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null
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
  const storeId = localStorage.getItem('userId')

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    localStorage.removeItem('userId')
    return null
  }


  return {
    token: storedToken,
    duration: remainingTime,
    userId: +storeId
  }
}



export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialToken
  let initialId
  if (localData) {
    initialToken = localData.token
    initialId = localData.userId
  }

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(initialId)


  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('exp')

    if(logoutTimer){
      clearTimeout(logoutTimer)
    }
  }, [])

  const login = (token, exp, userId) => {
      setToken(token)
      setUserId(userId)
      localStorage.setItem('token', token)
      localStorage.setItem('userId',userId)
      localStorage.setItem('exp', exp)

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
    userId
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext