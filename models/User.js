const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  date:{type:Date,required:true},
  gender:{type:String,required:true},
  photo:{type:String,required:true}
})

module.exports = model('User', schema)