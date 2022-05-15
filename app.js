const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')


// middleware
dotenv.config()
app.use(express.json())
app.use(morgan('dev'))




//connect database
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,

})
    .then(console.log("Database is running"))
    .catch(err => console.log("MONGO database connection error " + err))
//routes
app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', categoryRoute)
app.use('/api', productRoute)

//server port 
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})