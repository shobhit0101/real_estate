const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');
app.set('views', 'ejs_files');


//listen for request
app.listen(3000);
app.use(express.static('public'));
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

 app.use((req ,res) => {
    res.status(404).render('404',{title : '404'});
   });






