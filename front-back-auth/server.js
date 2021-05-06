const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./helpers/ConnectDB');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
dotenv.config({ path: '.env' })
//Connect to DB
ConnectDB();

//middlewares
app.use(express.json());

app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
//app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//Define routes
app.use("/register", require('./routes/register'));
app.use("/login", require('./routes/login'));
app.use("/post", require('./routes/post'));
app.use("/addClient", require('./routes/addClient'));
app.use('/router', require('./server/route/router'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is running on port: ${PORT}`))

