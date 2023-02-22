import React,{useEffect,useContext,useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import PeopleList from '../components/PeopleList'


export default function Acconts() {
    const {request,loading} = useHttp()
    const token = useContext(AuthContext).token
    const userId = useContext(AuthContext).userId
    const [users, setUsers] = useState([])

    const usersTransform = users.filter(user=>user._id !==userId)
  
useEffect(()=>{
 const sendRequest =async()=>{
    try{
        const fetched = await request('/api/people','GET',null,{
            Authorization: `Bearer ${token}`
          })
          setUsers(fetched)
    }catch(e){}
  }
  sendRequest()
},[token,request])
  return (
    <>
      {!loading && users.length >0 && <PeopleList users={usersTransform}/>}
      {usersTransform.length === 0 && <div style={{textAlign:'center'}}>Кроме этого пользователей нет</div>}
    </>
  )
}
