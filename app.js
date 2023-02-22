const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
app.use(express.json({ extended: true }))
app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/people',require('./routes/accounts.routes'))
app.use('/api/account',require('./routes/account.routes'))
const PORT = config.get("port") || 5000


async function start(){
    try{
      await mongoose.connect(config.get('mongoUrl'),{
        
      })
      app.listen(PORT,()=>{
       
    })

    }
    catch(e){
     console.log(e.message)
     process.exit(1)
    }
}

start()

