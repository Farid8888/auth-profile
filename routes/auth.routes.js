const {Router} = require('express')
const User = require('../models/User') 
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const {check,validationResult} = require('express-validator')

const router = Router()
router.post('/register',
[
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
async(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации'
        })
      }
    try{
        const {name,email,password,date,gender,photo} = req.body
        const candidate = await User.findOne({email})
        if(candidate){
          return res.status(400).json({message:'Такой пользователь уже существует'})
        }
        const hashedPassword =await bcrypt.hash(password,12)
    
        const user = new User({name:name,email:email,password:hashedPassword,date:date,gender:gender,photo:photo})
        await user.save()
        res.status(201).json({message:'Пользователь создан'})
    }catch(e){
      res.status(500).json({message:'Что-то пошло не так, попробуйте снова'})
    }
 
})


router.post(
    '/login',
    [
      check('email', 'Введите корректный email').normalizeEmail().isEmail(),
      check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему'
        })
      }
  
      const {email, password} = req.body
       console.log(email,'emailll')
      const user = await User.findOne({ email })
  
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }
  
      const isMatch = await bcrypt.compare(password, user.password)
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }
  
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )
  
      res.json({ token, userId: user.id })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
  
 



module.exports = router