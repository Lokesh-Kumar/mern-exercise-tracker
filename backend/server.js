const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
 

require('dotenv').config();

const app = express();
const port = process.env.PORT  || 5000;

//middleware
app.use(cors());
app.use(express.json());
//store the uri of mongoDB which we are going to use
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, 
                        useCreateIndex: true , 
                        useFindAndModify: false,
                        useUnifiedTopology: true,
                        reconnectTries: 30,
                        reconnectInterval: 500, // in ms 
                    }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connnection established successfully');
})
connection.on('error',(err) => {
    console.log("Mongoose default connection has occured "+err+" error");
});
mongoose.connection.on('error', function(err){
    console.log("Mongoose default connection has occured "+err+" error");
});

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('./exercises', exerciseRouter);
app.use('./users',userRouter);

app.listen(port, () =>{
    console.log(`Server is running on port : ${port}`);
});