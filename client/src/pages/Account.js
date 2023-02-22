import React,{useEffect,useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import { useMessage } from '../hooks/message.hook'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'



export default function Account() {
const [loading,setLoading] = useState(false)
const triggerHandler = useContext(AuthContext).triggerHandler
const message =useMessage()
const [form, setForm] = useState({
  name:'', password: '',photo:''
})
const id = useParams().id  
  useEffect(()=>{
    setLoading(true)
    const responseHandler=async()=>{
      try{
        const response = await   fetch(`/api/account/${id}`)
        const data =await response.json()
        setForm(prevst=>{
           return {
            ...prevst,
            name:data.name,
            photo:data.photo
           }
        })
       }catch(e){}
    }
    responseHandler().then(()=>window.M.updateTextFields())
    .then(()=>setLoading(false))
  },[])
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

const submitHandler =async()=>{
try{
const response = await fetch(`/api/account/${id}`,{
  method:'PUT',
   headers:{'Content-Type':'application/json'},
  body:JSON.stringify(form)
})
const data = await response.json()
message(data.message)
if(data.errors.length >=0 ){
  message(data.errors[0].msg)
}
 
triggerHandler()
}catch(e){

}
}

if(loading){
return <Loader/>
}else{

  return (
  <div className="row">
  <div className="col s6 offset-s3">
    <div className="card purple darken-1">
      <div className="card-content white-text">
        <div>
        <div className="input-field">
            <input
              id="name"
              type="text"
              name="name"
              className="yellow-input"
              value={form.name}
              onChange={changeHandler}
            />
            <label htmlFor="name">Изменить имя</label>
          </div>
          <div className="input-field">
            <input
              placeholder="Введите новый пароль"
              id="password"
              type="password"
              name="password"
              className="yellow-input"
              onChange={changeHandler}
            />
            <label htmlFor="password">Введите новый пароль</label>
          </div>
          
          <div className="input-field">
            <input
              placeholder="Введите фото"
              id="photo"
              type="url"
              name="photo"
              className="yellow-input"
              value={form.photo}
              onChange={changeHandler}
            />
            <label htmlFor="photo">Фото</label>
          </div>
        </div>
      </div>
      <div className="card-action"
      style={{cursor:`${!form.name || !form.photo || !form.password ? 'not-allowed' : 'pointer' } `}}
      >
         <button
          className="btn grey lighten-1 black-text"
          onClick={submitHandler}
          disabled={!form.name || !form.photo || !form.password}
          
        >
          Подтвердить
        </button>
      </div>
    </div>
  </div>
</div>
  )
}
}