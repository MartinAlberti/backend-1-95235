import express from "express"
import routingDetector from "./middlewares/routing.middleware.js"
// settings
const app = express()

// middlewares
app.use(express.json())// middleware nativo de express
app.use(routingDetector)


// routes
app.get('/', (req,res)=>{
    res.json({"mensaje":"INDEX"})

})
app.get('/services', (req,res)=>{
    res.json({"mensaje":"Services"})

})
app.get('/booking',(req,res)=>{
    res.json({"mensaje":"Booking"})

})

export default app