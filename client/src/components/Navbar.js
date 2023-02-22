import React, {useContext,useState,useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import { useAuth } from '../hooks/auth.hook'
import Img from '../components/Img'
import { Loader } from './Loader'
import { useHttp } from '../hooks/http.hook'

export const Navbar = () => {
  const history = useNavigate()
  const auth = useContext(AuthContext)
  const userId =useAuth().userId
  const loading = useHttp().loading
  const trigger = auth.trigger
  const [user,setUser] = useState({
    name:'',photo:''
  })


  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history('/')
  }

  useEffect(()=>{
    const responseHandler=async()=>{
      if(userId){
        try{
          const response = await fetch(`/api/account/${userId}`)
          const data =await response.json()
          setUser(prevst=>{
             return {
              ...prevst,
              name:data.name,
              photo:data.photo
             }
          })
         }catch(e){}
      }else{
        return
      }
      
    }
    responseHandler()
  },[userId,trigger])

  return (
    <nav>
      <div className="nav-wrapper purple darken-1" style={{ padding: '0 2rem' }}>
        {!loading && <Img name={user.name} source={user.photo}/>}
        {loading && <Loader/>}
        <ul id="nav-mobile" className="right">
          <li><NavLink to={`/account/${userId}`}>Редактировать профиль</NavLink></li>
          <li><NavLink to="/people">Список пользователей</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}
