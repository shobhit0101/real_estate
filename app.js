const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
//express app
const app = express();

//connect to mongodb
const dbURI='mongodb+srv://Vital:Vital@realestate.bhuwn.mongodb.net/real_database?retryWrites=true&w=majority';
mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) =>  app.listen(3000 ))
.catch((err)=>console.log(err));



//register view engine
app.set('view engine', 'ejs');
app.set('views', 'ejs_files');

//middleware & static files
app.use(express.static('public'));

//mongoose and mongo sandbox routes
app.get('/add-User',( req, res)=>{
   const user = new User({
      username: 'Vital',
      password: 'Vital',
      email: 'shobhitgpt01@gmail.com'
   });
   user.save()
   .then(result=>{
      res.send(result)}) 
      .catch(err=>{
          console.log(err);
      });
} )


//routes

app.get('/', (req,res) => {
   res.render('home',{title : 'Home'});
});

app.get('/home', (req,res) => {
   res.render('home',{title : 'Home'});
});

app.get('/postyourproperty', (req,res) => {
    res.render('postyourproperty',{title : 'Post Your Property'});
 });

 app.get('/aboutUs', (req,res) => {
    res.render('aboutus',{title : 'About Us'});

 });

 app.get('/login', (req,res) => {
    res.render('login',{title : 'Login'});
 });

 app.get('/viewproperty', (req,res) => {
   res.render('viewproperty',{title : 'View Property'});
});

app.get('/availableproperty', (req,res) => {
   res.render('availableproperty',{title : 'Available Property'});
});

 app.use((req ,res) => {
    res.status(404).render('404',{title : '404'});
   });






