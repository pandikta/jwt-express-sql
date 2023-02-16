require('dotenv').config()
const PORT = process.env.PORT || 5000
const express = require("express")

const usersRoutes = require("./routes/users.js")
const middlewareLogReq = require("./middleware/logs")
const app = express()


app.use(middlewareLogReq)
app.use(express.json())

app.use("/users", usersRoutes)



app.listen(PORT, () => {
    console.log(`Server berhasil run di port ${PORT}`);
})