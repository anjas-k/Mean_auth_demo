const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');

//**Database connection
mongoose.connect(config.database, { useNewUrlParser:true
    ,useUnifiedTopology: true},(err)=>{
        if (err) throw err
        console.log("Database connected successfully on "+config.database);
});

//**************************** */
const cors = require('cors');

const app = express();

const users = require('./routes/users.js');

app.use(cors());

app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.get('/',(req,res)=>{
    res.send("Invalid Endpoint");
})
app.listen(process.env.PORT || 3000,()=>{
    console.log("server running on port 3000")
})

app.use('/users',users);