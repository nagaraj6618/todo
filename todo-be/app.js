const express = require("express")
const app = express()
const PORT = process.env.PORT || 3500;
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const routerPage = require('./route/todoListRoute')
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
app.use(cors())
db.on('error',(errormessage)=>console.log(errormessage))
db.once('open',()=>console.log('Connection Established'))
app.use(express.json())
app.get('/',(req,res)=>{
  res.send("Working")
})

app.use('/api/v1/list',routerPage)
app.listen(PORT,()=>console.log(`listening at http://localhost:${PORT}`))