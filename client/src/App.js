import React,{useState} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import 'materialize-css'

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const [trigger,setTrigger]=useState(false)
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
const triggerHandler =()=>{
  setTrigger(prevst=>{
    return !prevst
  })
}
  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated,triggerHandler,trigger
    }}>
      <Router>
        { isAuthenticated && <Navbar /> }
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
