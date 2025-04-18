import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { PORT } from './config/config.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

const app = express()

// middlewares
app.use(morgan('dev'))  
app.use(express.json())
app.use(cors())


app.use('/users', userRoutes)
app.use('/posts', postRoutes)

// main page
app.get('/', (req, res) => {
  res.send('Hello! My Social Media API is working :)')
})


app.listen(PORT, () => {
  console.log('*****************************')
  console.log('Server running on port ' + PORT)
  console.log('*****************************')
})
