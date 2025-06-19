const express = require("express");
const cors = require('cors');
const jwt = require("jsonwebtoken");

const secretKey = 'pizza';
const jwtOptions = { expiresIn: '1h' }
function creatToken(id){
    return jwt.sign(
        { userId: id},
        secretKey,
        jwtOptions
    );
}
function verificationToken(token){
    let decodedToken
    try {
        decodedToken  = jwt.verify(token, secretKey);

    } catch (err) {
        decodedToken  = {userId:-1}
    }
    return decodedToken
}


const app = express();
app.use(express.json());
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: 'http://localhost:5173',
    credentials: true
}));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Укажите ваш фронтенд-адрес
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

data = {
    goods: {
        1:{
            id: 1,
            name: "Ноутбук",
            price:45600
        },
        2:{
            id: 2,
            name: "Мышка",
            price:1000
        },
        3:{
            id: 3,
            name: "кокос",
            price:200
        },
        4:{
            id: 4,
            name: "пицца",
            price:9999999
        }
    },
    users:{
        1:{
            id: 1,
            login: "123",
            password: "123",
            basket: {
                1:{
                    id: 1,
                    count: 1
                },
            }
        }
    }
}
app.get("/getGoods", (req, res)=>{
    const decodedToken = verificationToken(req.headers.authorization)
    if (decodedToken.userId!=-1){
        res.status(200).json({
            status: 200,
            goods: data.goods,
            basket: data.users[decodedToken.userId].basket
        });
    }
    else {
        res.status(401 ).json({
            status: 401 ,
            error: {
                message: "неверное имя пользователя или пароль"
            }
        });
    }
})
app.post("/authorization", (req, res)=>{
    const { login, password } = req.body;
    for (userIdx in data.users){
        const user = data.users[userIdx]
        if (user.login == login && user.password == password){
            const token = creatToken(user.id)
            res.status(200).json({
                status: 200,
                token: token
            })
        }
        else {
            res.status(404).json({
                status: 404,
                error: {
                    message: "неверное имя пользователя или пароль"
                }
            })
        }
    }
})


app.post("/updateProductBasket", (req, res)=>{
    const decodedToken = verificationToken(req.headers.authorization)
    const {productId, count } = req.body;
    if (decodedToken.userId!=-1) {
        data.users[decodedToken.userId].basket[productId] = {
            id: productId,
            count: count
        }
    res.status(200).json({status:200})
    }
    else {
        res.status(401 ).json({
            status: 401 ,
            error: {
                message: "неверное имя пользователя или пароль"
            }
        });
    }
})
app.patch("/updateProductBasket", (req, res)=>{
    const decodedToken = verificationToken(req.headers.authorization)
    const {productId, count } = req.body;
    if (decodedToken.userId!=-1) {
        data.users[decodedToken.userId].basket[productId].count = count
        res.status(200).json({status:200})
    }
    else {
        res.status(401 ).json({
            status: 401 ,
            error: {
                message: "неверное имя пользователя или пароль"
            }
        });
    }
})
app.delete("/updateProductBasket", (req, res)=>{
    const decodedToken = verificationToken(req.headers.authorization)
    const {productId} = req.body;
    if (decodedToken.userId!=-1) {
        delete data.users[decodedToken.userId].basket[productId]
    res.status(200).json({status:200})
    }
    else {
        res.status(401 ).json({
            status: 401 ,
            error: {
                message: "неверное имя пользователя или пароль"
            }
        });
    }
})

const PORT = 3000
app.listen(PORT, console.log(`http://localhost:${PORT}`))