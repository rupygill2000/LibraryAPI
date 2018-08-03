 var express               = require ('express');
 var app                   = express();
 var mongoose              = require('mongoose');
 var bodyParser            = require('body-parser');
 var jwt                   = require('express-jwt');
 var rsaValidation         = require('auth0-api-jwt-rsa-validation');
 var passport              = require("passport");
 var localStrategy         = require("passport-local");
 var passportLocalMongoose = require("passport-local-mongoose");
 var User                  = require("./models/user");
 var BookRoutes            = require("./Routes/BookRoutes");


 
  
// connection to the database
 var db= mongoose.connect('mongodb://admin:admin12345@ds018168.mlab.com:18168/bir_test').catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
    });

 
mongoose.Promise = global.Promise;
 
var Book = require ('./models/bookModel');

var port = process.env.port || 3000;
app.set('view engine','ejs');
app.set('appData',db);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(require("express-session")({
    secret: "Project Book API Backend and Frontend",
    resave: false,
    saveUninitialized: false


}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


bookRouter = require ('./Routes/BookRoutes')(Book);
 app.use('/api/books',isLoggedIn, bookRouter);
//================================================================================
//Declare Router

//Auth Routes
//Show User Registration Form
app.get("/register",function(req,res){
    res.render("register");

});
//Handling User Sign Up
app.post("/register", function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}),req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/api/books");
        });
    });
    //res.send("User Created Successfully");


});

//Login Routes
//Render Login Form
app.get("/login", function(req,res){
    res.render("login");
});
//Login Logic
app.post("/login",passport.authenticate("local",{
    successRedirect: "/api/books",
    failureRedirect: "/login"

}) ,function(req,res){


});

//Logout Route
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});

//Is Logged in

function isLoggedIn(req, res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.get('/',function(req,res){
   // res.sendFile('index.html',{root: __dirname });
   res.render("home");
 });

 //Restful Routes
 
app.listen(port,function(){
console.log('Running on PORT: '+ port);
 });