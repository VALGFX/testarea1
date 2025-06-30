import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectCloudinary from './config/cloudinary.js'
import connectDB from './config/mongodb.js'

// Routes
import adminRouter from './routes/adminRoutes.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import productRouter from './routes/productRoute.js'
import userRouter from './routes/userRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000

// Connect DB and Cloudinary
connectDB()
connectCloudinary()

// Middleware - FOARTE IMPORTANT
app.use(express.json())
app.use(cors())

// API Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/admin', adminRouter)

// Default route
app.get('/', (req, res) => {
	res.send('✅ API Working')
})

// Start server
app.listen(port, () => {
	console.log(`🚀 Server started on PORT: ${port}`)
})
