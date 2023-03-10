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
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card purple darken-1" style={{marginTop:'7rem'}}>
          <div className="card-content white-text">
            <span className="card-title">??????????????????????</span>
            <div>
            {show && <div className="input-field">
                <input
                  placeholder="?????????????? ??????"
                  id="name"
                  type="text"
                  name="name"
                  className="yellow-input"
                  value={form.name}
                  onChange={changeHandler}
                />
                <label htmlFor="name">??????</label>
              </div>}
              <div className="input-field">
                <input
                  placeholder="?????????????? email"
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
                  placeholder="?????????????? ????????????"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                  onClick={passwordHandler}
                />
                <label htmlFor="password">????????????</label>
                {pasVal && <div style={{color:'red'}}>?????????????????????? ?????????? ???????????? 6 ????????????????</div>}
              </div>
               {show && <div className="input-field">
                <input
                  placeholder="?????????????? ???????? ????????????????"
                  id="date"
                  type="date"
                  name="date"
                  className="yellow-input"
                  value={form.date}
                  onChange={changeHandler}
                />
                <label htmlFor="date">???????? ????????????????</label>
              </div>}
              
              {show && 
                <div className="yellow-input">
                <select className="browser-default yellow-input" defaultValue={"???????????????? ??????"} name='gender' onClick={changeHandler}>
                  <option value="???????????????? ??????" disabled>???????????????? ??????</option>
                  <option value="??????????????">??????????????</option>
                  <option value="??????????????">??????????????</option>
                </select>
              </div>
              }
              {show && <div className="input-field">
                <input
                  placeholder="?????????????? ????????"
                  id="photo"
                  type="url"
                  name="photo"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="photo">????????</label>
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
              ??????????
            </button>}
            <button 
            className="btn green darken-4"
            style={{marginRight: 10}}
              disabled={loading}
              onClick={switchHandler}
            >
            {!show ? '????????????????????????????????????' : '?????????? ?? ??????????????'}
            </button>
            {show && 
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={validation}
              type='button'
            >
              ??????????????????????
            </button>
            
            }
          </div>
        </div>
      </div>
    </div>
  )
}
