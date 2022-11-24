const express = require("express");
const path = require("path");
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const routes = require("./routes/index.js");
const mark = require("./market.js") 
mark.start();
const app = express();

dotenv.config();
app.set('port',process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended : false}));  
app.use("/",routes) 
app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = "404"
    next(error)
})

app.use((err,req,res,next) => {
    res.locals.message = err.message
    res.locals.error = {};
    res.status(err.status || 500)
    res.send('error');
})

app.listen(app.get('port'),(req,res) => {
    console.log(app.get('port'),"포트 열림")
})


