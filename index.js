const cookieParser = require('cookie-parser')
require('dotenv').config()

const express = require('express')

const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// cookie middleware
app.use(cookieParser())

// router
const userRouter = require('./routers/userRoutes')
app.use('/api', userRouter)

const postRouter = require('./routers/postRoutes');
app.use('/api', postRouter);

app.get('/', (req,res) => {
    return res.send({message:"Hey !!"})
})

app.listen(3000, (err) => {
    if(!err){
        console.log("Server run 3000");
    }
})