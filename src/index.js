import { config } from 'dotenv'
import express from 'express'
import cors from "cors"

var whitelist = ['http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }


let app = express()
app.use(cors(corsOptions))
// app.use(express.static('dist')) directly render the FE using middleware (not a good practice)
config()

let port = process.env.PORT

// app.get('/api',(req,res) => {
//     return res.send("server is ready")
// })


app.listen(port,() => {
    console.log(`server connected successfully at ${port}`)
} )