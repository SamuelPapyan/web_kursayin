import express from "express"
import mongoose from "mongoose"
import router from "./routes"
import dotenv from 'dotenv'
import { json } from 'body-parser'
import cors from 'cors'
import { errorHandlingMiddleware } from "./middlewares/error-handling.middleware"
import cloudinaryService from "./services/cloudinary.service"
import authService from "./services/auth.service"

//Configuring .env variables
dotenv.config()

// Initiating express app
const app = express()
// Using CORS
app.use(cors())
// Using JSON body parser
app.use(json())
// Using main api router
app.use('/api/v1', router)
// Using error handling middleware
app.use(errorHandlingMiddleware)

// Initiate auth service
authService.initiateAuthService()

// Configuring Cloudinary
cloudinaryService.setupCloudinary()

//Connecting to DB
mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("Database connection estabilisted!")
    // Listening
    app.listen(2026, ()=>{
        console.log("Api Listening to 2026!")
    })
})
