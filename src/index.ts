import express from 'express'
import dotenv from 'dotenv'
import { MongooseConfig } from './database/Mongo-config'



dotenv.config()
MongooseConfig.InicializeConnection()

const app = express()



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})




