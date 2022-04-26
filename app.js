
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const User = require('./models/User');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const property_model=require('./models/Property');
const multer = require('multer');


//express app
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended:true
}))
//connect to mongodb
const dbURI='mongodb+srv://Vital:Vital@realestate.bhuwn.mongodb.net/real_database?retryWrites=true&w=majority';
mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) =>  app.listen(3000 ))
.catch((err)=>console.log(err));


// mongodb://localhost:27017/mydb'

let db= mongoose.connection;
//register view engine
app.set('view engine', 'ejs');
app.set('views', 'ejs_files');

//middleware & static files
app.use(express.static('public'));

//setting up multer
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, 'public/images')
   },
   filename: (req, file, cb) => {
       cb(null, file.fieldname + '-' + Date.now())
   }
});
 
var upload = multer({ storage: storage });









//mongoose and mongo sandbox routes
app.get('/admi',( req, res)=>{
   const user = new User({
      username: 'lakshya',
      password: 'Vitl',
      email: 'shobhitgpt01@gmail.com'
   });
   user.save()
   .then(result=>{
      res.send(result)}) 
      .catch(err=>{
          console.log(err);
      });
} )



//login
let state=0;let objlogin;
let namee;let eemail;
app.post("/login",(req,res)=>{
   let name=req.body.name;
   let password=req.body.passs;
   let query={username:name,password:password};
   db.collection('users').find(query).toArray(function(err,result){
      if(err) throw err;
      if (result[0]==null){
         res.render('login',{title : 'Login'});
         // state=1;
         // name=result[0].username;
         // return res.render('welcomepage',{name : result[0].username});
      }
      else{
         // alert("Incorrect credentials");
         objlogin=result[0];
         eemail=result[0].email;
         let query={email:eemail};
         
         state=1;
         namee=result[0].username;
         console.log(name);
         db.collection('property_model2').find(query).toArray(function(err,result){
                     
            
            
            return res.render('welcomepage',{name : name,data:objlogin,dataprop:result});
         })
         
         

      }

      
   })
   
})

//

//signout
app.post("/logout",(req,res)=>{
   
   state=0;
   res.render('login',{title : 'Login'});
})


//signup
let otp;let data;
app.post("/sign_up",(req,res)=>{
   var name = req.body.signupUsername;
   var email = req.body.email;
   
   var password = req.body.pass;
   var password2 = req.body.pass2;
   data = new User({
       username: name,
       password : password,
       email : email
       
       
   });

   // db.collection('users').insertOne(data,(err,collection)=>{
   //     if(err){
   //         throw err;
   //     }
   //     console.log("Record Inserted Successfully");
   // });

   //otp Verification
   otp=Math.floor((Math.random() * 9999) + 1000);
   var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'groupfsd20@gmail.com',
        pass: 'Grp201234#'
      }
   });
   var mailOptions = {
      from: 'groupfsd20@gmail.com',
      to: email,
      subject: 'Verification code',
      text: 'Your unique otp is '+otp
    };
    
   transporter.sendMail(mailOptions, function(error, info){
   if (error) {
      console.log(error);
   } else {
      console.log('Email sent: ' + info.response);
   }
   });

   // return res.render('home')
   res.render('verification',{title : 'signup'});
})

//otp
app.post("/verification",(req,res)=>{
   let votp=req.body.otp;
   if(votp==otp){
      db.collection('users').insertOne(data,(err,collection)=>{
         if(err){
             throw err;
         }
         console.log("Record Inserted Successfully");
     });
     state=1;
     return res.render('welcomepage',{name : data.username});
   }
   else{
      // alert("Incorrect otp");
      res.render('verification',{title : 'signup'});
   }
})


//mail
app.post("/mail",(req,res)=>{

   let name=req.body.name;
   let email=req.body.email;
   let message=req.body.text;
   var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'groupfsd20@gmail.com',
        pass: 'Grp1234#'
      }
   });
   var mailOptions = {
      from: 'groupfsd20@gmail.com',
      to: eemail,
      subject: 'Hey '+namee+' Someone is looking for u',
      text: 'This mail is from:\n'+name+'\n'+email+'\n'+message
    };
    
   transporter.sendMail(mailOptions, function(error, info){
   if (error) {
      console.log(error);
   } else {
      console.log('Email sent: ' + info.response);
   }
   });
   res.render('home',{title : 'Home'});
})
//


//postyourproperty
app.post("/post",upload.single('image'),(req,res)=>{
   let datas={
       email:eemail,
       purpose :req.body.purpose,
       property_category :req.body.prop_cat,
       city:req.body.city,
       apart:req.body.Apartment_society,
       locality:req.body.Locality,
       subloc:req.body.sublocality,
       houseno:req.body.houseno,
       no_of_bedrooms :req.body.bedrooms,
       no_of_bathrooms :req.body.Bathrooms,
       
       no_of_floors :req.body.Balconies,
       area_of_property :req.body.area,
       area_unit:req.body.Area_Unit,
       availabiltiy_status :null,
       img: {
         data: fs.readFileSync(path.join(__dirname + '/public/images/' + req.file.filename)),
         contentType: 'image/png'
       },
       property_price :req.body.price,
       owwner_name :null,
       owner_contact_no :req.body.phoneno,
       property_age:0,
       abt_property:null,
   }
   db.collection('property_model2').insertOne(datas,(err,collection)=>{
      if(err){
          throw err;
      }
      console.log("Record Inserted Successfully");
   });
      //join databases
   db.collection('users').aggregate([
      {$lookup:
         {
            from:'property_model2',
            localField:'email',
            foreignField:'email',
            as:'postedproperty'
         }
      }
   ]).toArray((err,re)=>{
      if (err) throw err;
      console.log(re);
      
      // re.redirect("/a");
   })
   res.render('viewproperty',{data:datas,title:'viewproperty'});
   

          
      
  });
//search
app.post("/search",(req,res)=>{
   let city=req.body.search;
   let query={city:city};
   db.collection('property_model2').find(query).toArray(function(err,result){
      
      res.render('template',{title : city,data:result});
   });
}) 
 //to get to view property
app.get("/v",(req,res)=>{
   let city=req.query.a;
   let query={city:city};
   db.collection('property_model2').find(query).toArray(function(err,result){
      
      res.render('viewproperty',{data:result[req.query.obj],title:'viewproperty'});
   });
    
   
   
})
//

//
app.get("/a",(req,res)=>{
   
   db.collection('property_model2').find({}).toArray(function(err,data){
      console.log(data[1].email);
      data.forEach((err,reee)=>{
         console.log(reee.city);
      })
      for(let i=0;i<15;i++){
         console.log(data[i].city);
      }
      console.log(data[10].city);
      res.render('viewproperty',{data:data[14],title:'viewproperty'});
   });
})
//updation
app.post('/update',(req,res)=>{
   let i=req.query.obj;
   let myquery = { email: eemail };
   let newv = { $set: { i: "Canyon 123" } };
   db.collection("customers").updateOne(myquery, newv, function(err, resp) {
      if(err) throw err;
      console.log(resp);
   });
   
})
//
//deletion
app.get('/del',(req,res)=>{
   
   
   var myquery = { username: req.query.name,email:req.query.email };
   db.collection("user_5").deleteMany(myquery, function(err, obj) {
      if (err) throw err;
      
      
   });
   res.redirect("/admin");
})
//
//admin
app.get("/admin",(req,res)=>{
   db.collection('user_5').find({}).toArray(function(err,data){
   res.render('admin',{data:data ,title:'Admin' ,page_name:'admin_users'} );
   });
});

app.get("/admin_property",(req,res)=>{
   db.collection('property_model2').find({}).toArray(function(err,data){
   res.render('admin_property',{data:data ,title:'Admin' ,page_name:'admin_property'} );
   });
});
//
//routes

app.get('/', (req,res) => {
   res.render('home',{title : 'Home'});
});

app.get('/home', (req,res) => {
   res.render('home',{title : 'Home',active :'home'});
});

app.get('/postyourproperty', (req,res) => {
   if(state==1)
      res.render('postyourproperty',{title : 'Post Your Property'});
   else
      res.render('login',{title : 'Login'});
 });

 app.get('/aboutUs', (req,res) => {
    res.render('aboutus',{title : 'About Us'});

 });

 app.get('/login', (req,res) => {
    if(state==1){
      
      res.render('welcomepage',{name : namee});
    }
    else
      res.render('login',{title : 'Login'});
 });

//posted property 
app.get('/p',(req,res)=>{
   if(state==1){
      let query={email:eemail};
      db.collection('property_model2').find(query).toArray(function(err,result){
                  
         
         
         res.render('template',{title : namee,data:result});
      })
   }
   else{
      res.render('login',{title : 'Login'});
   }
})
//
 app.get('/viewproperty', (req,res) => {
   res.render('viewproperty',{title : 'View Property'});
});

app.get('/availableproperty', (req,res) => {
   res.render('availableproperty',{title : 'Available Property'});
});
app.get('/template',(req,res)=>{
      
   res.render('template');
})
app.get('/admin', (req,res) => {
   res.render('admin',{title : 'Admin',page_name: 'admin_users'});
});

app.get('/admin_property', (req,res) => {
   res.render('admin_property',{title : 'Admin',page_name : 'admin_property'});
});
app.get('/editprofile', (req,res) => {
   res.render('editprofile',{title : 'Edit Profile'});
});
//admin login
app.get("/admin_login",(req,res)=>{
   res.render('admin_login',{title : 'Admin Login'});
})
app.post("/adminl",(req,res)=>{
   res.redirect("/admin");
});
//
 app.use((req ,res) => {
    res.status(404).render('404',{title : '404'});
   });






