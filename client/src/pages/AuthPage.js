import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'



export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [show,setShow] = useState(false)
  const [pasVal,setPasVal] = useState(false)
  const [passwordVal,setpasswordVal] = useState(false)
  const [touched,setTouched] = useState(false)
  const [form, setForm] = useState({
    name:'',email: '', password: '',
    gender:'',date:'',photo:''
  })
 const validation = !form.name || !form.email || !form.password || !form.gender || !form.date || !form.photo
 
  useEffect(() => {
    message(error)
    clearError()
    if(passwordVal && touched){
      setPasVal(true)
    }else{
      setPasVal(false)
    }
  }, [error, message, clearError,passwordVal,touched])

  useEffect(() => {
    window.M.updateTextFields()
  }, [show])

  const switchHandler =()=>{
   setShow((prevst)=>{
      return !prevst
    })
    form.password.length>=6 && setForm({
      name:'',email: '', password: '',
  gender:'',date:'',photo:''
    })
  }
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const passwordHandler =()=>{
    setTouched(true)
  }
  const registerHandler = async () => {
  form.password.length>=6 && setShow(prevst=>{
      return !prevst
    })
    setpasswordVal(form.password.length < 6)
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
       message(data.message)
    
    } catch (e) {}
   
  }


  
    
  
  const loginHandler = async () => {
    try {
    
      const data = await request('/api/auth/login', 'POST', {...form})
      console.log(form)
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card purple darken-1" style={{marginTop:'7rem'}}>
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
            {show && <div className="input-field">
                <input
                  placeholder="Введите имя"
                  id="name"
                  type="text"
                  name="name"
                  className="yellow-input"
                  value={form.name}
                  onChange={changeHandler}
                />
                <label htmlFor="name">Имя</label>
              </div>}
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                  onClick={passwordHandler}
                />
                <label htmlFor="password">Пароль</label>
                {pasVal && <div style={{color:'red'}}>Минимальная длина пароля 6 символов</div>}
              </div>
               {show && <div className="input-field">
                <input
                  placeholder="Введите дату рождения"
                  id="date"
                  type="date"
                  name="date"
                  className="yellow-input"
                  value={form.date}
                  onChange={changeHandler}
                />
                <label htmlFor="date">Дата рождения</label>
              </div>}
              
              {show && 
                <div className="yellow-input">
                <select className="browser-default yellow-input" defaultValue={"Выберите пол"} name='gender' onClick={changeHandler}>
                  <option value="Выберите пол" disabled>Выберите пол</option>
                  <option value="Мужчина">Мужчина</option>
                  <option value="Женщина">Женщина</option>
                </select>
              </div>
              }
              {show && <div className="input-field">
                <input
                  placeholder="Введите фото"
                  id="photo"
                  type="url"
                  name="photo"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="photo">Фото</label>
              </div>}
            </div>
          </div>
          <div className="card-action">
            {!show && <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>}
            <button 
            className="btn green darken-4"
            style={{marginRight: 10}}
              disabled={loading}
              onClick={switchHandler}
            >
            {!show ? 'Зарегистрироваться' : 'Войти в аккаунт'}
            </button>
            {show && 
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={validation}
              type='button'
            >
              Регистрация
            </button>
            
            }
          </div>
        </div>
      </div>
    </div>
  )
}
