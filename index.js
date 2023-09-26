const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie and authentication
const session=require('express-session');
const flash=require('connect-flash');
const customeMiddleware = require('./config/flashMiddleware');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const saasMiddleware=require('node-sass-middleware')

app.use(saasMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))


app.use(express.static('./assets'));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);

//extract styles and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up the view engine 
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in db

app.use(session({
    name:'Code Chats',
    //ToDo change the secret before deployment
    secret:"blahblah",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        { 
            mongoUrl: 'mongodb+srv://saransh:admin@codechats.1opoquf.mongodb.net/?retryWrites=true&w=majority',
            autoRemove:'disabled'
        },function(err){
        console.log(err || 'connected to mongo db');
    })

}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customeMiddleware.setFlash);

//use express router
app.use('/',require('./routes')) //middleware

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server :${err}`)
    }
    console.log(`Server is running on port: ${port}`)
});
