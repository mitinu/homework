const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "test")))
app.use(express.static(path.join(__dirname, "src"), { index: false }));
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "test/displaying/displaying.html"))
})

const PORT = 3000
app.listen(3000, console.log(`отчет по тестам\nhttp://localhost:${PORT}`))