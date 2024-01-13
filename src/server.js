import express from "express";
import bodyParser from "body-parser"; // user?id=7  để server có thể lấy ra số 7
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require('dotenv').config();

let app = express();

// config app 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
app.listen(port, ()=>{
    // call back
    console.log("---------------------Running Port : " + port + "---------------------");
});