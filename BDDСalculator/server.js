const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "src/index")));
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "src/index/index.html"))
})

const PORT = 3000
app.listen(PORT, console.log(`отчет по тестам\nhttp://localhost:${PORT}`))