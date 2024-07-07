let express = require('express')
let app = express()

let port = 8080

app.get('/',(req,res) => {
    return res.send("server connected")
})
app.get('/login',(req,res) => {
    return res.send("<h1>Login</h1>")
})


app.listen(port,() => {
    console.log(`server connected successfully ${port}`)
} )