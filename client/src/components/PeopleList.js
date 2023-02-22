import React from 'react'
import Img from '../components/Img'
import classes from './PeopleList.module.css'
import {useNavigate} from 'react-router-dom'

export default function PeopleList({users}) {
  const navigate = useNavigate()
const accountHandler = (id)=>{
navigate(`/account/${id}`)
}
  return (
    <div style={{padding:'30px'}}>
      {users.map(user=>{
        const age =new Date().getFullYear() - new Date(user.date).getFullYear()
        return(
          <div  key={user._id}  className={classes.people} onClick={()=>accountHandler(user._id)}>
            <div>
                <Img source={user.photo} name={user.name} />
            </div>
            <div>{age} лет</div>
          </div>    
        )
      })}
    </div>
  )
}
