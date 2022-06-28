const express = require('express');
const morgan = require('morgan');
const mainRoutes = require('./routes/mainRoutes');

const db = require("./models");

// express app
const app = express();
const port = process.env.PORT|| 3000;

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// routes

app.use('/', mainRoutes);


// 404 page
app.use((req, res) => {
  res.send("page not found");
});

//database connection
db.sequelize.sync().then(req =>{ 
    app.listen(port , ()=>{
        console.log("server running");
    })
});