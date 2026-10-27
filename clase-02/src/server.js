import express from "express"
import routingDetector from "./middlewares/routing.middleware.js"
import serviceRouter from './routes/services.routes.js'
import bookingRouter from './routes/booking.routes.js'
// settings
const app = express()

// middlewares
app.use(express.json())// middleware nativo de express
app.use(routingDetector)


// routes
app.get('/', (req,res)=>{
    res.json({"mensaje":"INDEX"})
})

app.use("/api/services", serviceRouter);
app.use('/api/booking', bookingRouter)


export default app