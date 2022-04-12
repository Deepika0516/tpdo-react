const dotenv = require('dotenv')

dotenv.config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


const URI = process.env.MONGODB_URL
mongoose.connect(URI).then(() => console.log('Connected to mongodb'))
.catch((err) => console.log('Connection failed'))

app.use('/user', require('./routes/userRoute'))


// app.use('/', (req, res, next) => {
// res.json({msg: 'Hello'})
// })

// app.use('/user', (req, res, next) => {
//     res.json({msg: 'user'})
//     })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Server is running on PORT', 5000)
})