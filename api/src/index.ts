import express from "express"
import mongoose from "mongoose"
import router from "./routes"
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use('/api/v1', router)

mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("Database connection estabilisted!")
    app.listen(2026, ()=>{
        console.log("Api Listening to 2026!")
    })
})
