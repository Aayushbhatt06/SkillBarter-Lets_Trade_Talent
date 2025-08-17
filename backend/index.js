const express = require('express')
const app = express()
const user = require('./Models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ApiRouter = require('./Routes/ApiRouter')
require('dotenv').config()

const PORT = process.env.PORT;

app.get('/ping',(req,res)=>{
    res.send("PONG")
})
app.get('/',(req,res)=>{
    res.send("Hello World!!!")
})

app.use(bodyParser.json());
app.use(cors())
app.use('/auth', AuthRouter)
app.use('/api',ApiRouter)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})