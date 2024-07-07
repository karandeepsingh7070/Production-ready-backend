import dotenv from "dotenv"
import connectDB from './db/index.js'
import { app } from "./app.js"

dotenv.config()

connectDB()
.then(() => {
    let port = process.env.PORT || 8080
    app.listen(port, () => {
        console.log(`Server initiated at ${port}`)
    })
})
.catch((err) => {
    app.on(('error', (err) => {
        console.log(err)
        process.exit(1)
    }))
    console.log("MongoDB connection failed")
})