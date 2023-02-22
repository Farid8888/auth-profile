const {Router} = require('express')
const User = require('../models/User') 
const {check,validationResult} = require('express-validator')

const router = Router()

router.get('/:id',
async(req,res)=>{
    try {
       const user = await User.findById(req.params.id)
       res.json(user)
      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
 
})

router.put('/:id',
[
  check('password', 'Минимальная длина пароля 6 символов')
    .isLength({ min: 6 }),
],
async(req,res)=>{
  const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации'
        })
      }
  try {
    await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        password: req.body.password,
        photo:req.body.photo
    });

    res.status(201).json({message:'Пользователь отредактирован'})

  } catch(err) {
      res.status(500).json('Что-то пошло не так, попробуйте снова');
  }


 
})


module.exports = router