const express = require('express')
const app = express()
const user = require('./Models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ApiRouter = require('./Routes/ApiRouter')

const PORT = 8080;

app.get('/ping',(req,res)=>{
    res.send("PONG")
})

app.use(bodyParser.json());
app.use(cors())
app.use('/auth', AuthRouter)
app.use('/api',ApiRouter)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})