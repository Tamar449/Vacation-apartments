import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import advertiserRouter from './Api/Routers/Advertiser.js'
import categoryRouter from './Api/Routers/Category.js'
import apartmentRouter from './Api/Routers/Apartment.js'
import areaRouter from './Api/Routers/Area.js'


const app = express()
const port = 3001

dotenv.config()

app.use(cors())

mongoose.connect("mongodb+srv://tamarb254:yhO7erJbAS0OuzSI@vocation-apartments.ecnr4.mongodb.net/")
    .then(() => {
        console.log('connect to mongoDB');
    })
    .catch(err => {
        console.error({ error: err.message })
    })


app.use(bodyParser.json())
app.use('/advertiser',advertiserRouter)
app.use('/category', categoryRouter)
app.use('/apartment', apartmentRouter)
app.use('/area' , areaRouter)

app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`)
})