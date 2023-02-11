require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/connect");
const router = require("./routes/router");
const Products = require("./models/productsSchema");
const cookieParser = require("cookie-parser");
const DefaultContent = require("./defaultcontent")


const cors = require("cors")

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

const port = process.env.PORT || 8005;


if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

app.listen(port,()=>{
    console.log(`server is running on port number ${port}`);
});


DefaultContent();