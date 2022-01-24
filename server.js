/*
PARA O RODAR server.js:
DIGITAR: npm run devStart
IR EM: localhost:3000\index
*/
const express = require("express"); //FRAMEWORK: expresss
const { send } = require("express/lib/response");
const app = express();
const mongoose = require("mongoose");//BD: MongoDB

//BANCO DE DADOS - conectars
mongoose.connect("mongodb://localhost/users",{useNewUrlParser: true}); 
const db = mongoose.connection
db.on("error",(error)=> console.error(error))
db.once("open",()=> console.log("Conectado ao banco de dados"))


app.use(express.json())
//app.use(express.urlencoded());

//ROUTES

const userRouter = require("./routes/users");
app.use("/users",userRouter)

app.use(express.static(__dirname+'/public'));

app.get('/index',(req,res) => {
    //res.sendFile(__dirname+ "/CSS/styles.css")
    res.sendFile(__dirname+ "/view/index.html")
})
app.get('/cadastro',(req,res) => {
    //res.sendFile(__dirname+ "/CSS/styles.css")
    res.sendFile(__dirname+ "/view/cadastro.html")
})

//TODO LIST
app.get('/todo',(req,res) => {
    res.sendFile(__dirname+ "/view/todo.html")
})

app.get('/script/app.js',(req,res) => {
    res.sendFile(__dirname+ "/script/app.js")
})


app.post('/cadastrei', (req,res) =>{
    res.send({email: req.body.email, nome: 'hi'})
}
)


app.listen(3000, () => console.log('Server is running'));