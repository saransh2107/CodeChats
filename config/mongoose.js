const mongoose=require('mongoose');
let url="mongodb+srv://saransh:admin@codechats.1opoquf.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url);

const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,"Error connecting to DB"));

//up and runnning
db.once('open',function(){
    console.log("Successfully connected to DB")
})
module.exports=db;