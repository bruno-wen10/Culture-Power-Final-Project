import express from 'express'
import dotenv from 'dotenv'
import { MongooseConfig } from './database/Mongo-config'
import { userRoutes } from './Modules/User/routes/User-routes'
import { userRouterAuthLogin } from './Modules/Auth-login/routes/Auth-login-routes'
import { AuthMiddleware } from './Middlewares/Auth-login-middleware'



dotenv.config()
MongooseConfig.InicializeConnection()

const app = express()

app.use(express.json())


app.use(userRouterAuthLogin)
app.use(userRoutes)



app.listen(process.env.PORT, ()=>{
    console.log(`🌝 Server is running on port ${process.env.PORT}`)
})




