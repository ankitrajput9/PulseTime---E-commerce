import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { connectDB } from "./config/db.js"
import Cookieparser from "cookie-parser"
import Authrouter from "./routes/auth.route.js"
import Productsrouter from "./routes/products.route.js"
import Cartrouter from "./routes/cart.route.js"

import cors from "cors"
import { errorMiddleware } from "./middlewares/error.middleware.js"
import { cacheConnect} from "./config/cache.js"
import passport from "passport"
import { GoogleStrategies } from "./config/auth.js"
import { authMiddleware } from "./middlewares/auth.middleware.js"

const app = express()
const port = process.env.PORT

// Middlewares
app.use(express.json())
app.use(Cookieparser())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// config files 
connectDB()
cacheConnect()
app.use(passport.initialize())

GoogleStrategies()

//  Apis
app.use("/api/auth", Authrouter)
app.use("/api/products", Productsrouter)
app.use("/api/cart",authMiddleware,Cartrouter)



app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})