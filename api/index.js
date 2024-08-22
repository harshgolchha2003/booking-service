const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader=require('image-downloader');

const UserModel = require('./models/user.js');
require('dotenv').config();
const app=express();

const secret = bcrypt.genSaltSync(10);
const secretJWT = "secretnhibataunga";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin:'http://localhost:5173',
}));

// console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL);
app.post('/register',async (req, res)=>{
    const {name,email,password}=req.body;
    try{

        const user= await UserModel.create({name:name,email:email,password:bcrypt.hashSync(password,secret)});
        
    }
    catch(error){
        res.status(422).json({error:error.message});
    }
    
});
app.post('/login',async (req, res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email:email});
    if(user)
    {
        const pass=bcrypt.compareSync(password,user.password);
        if(pass){
            jwt.sign({email:email,id:user._id},secretJWT,{},(err,token)=>{
                if(err)
                    throw err;
                else 
                res.cookie('token',token).json(user);
            })
        }
        else res.status(422).json("Invalid Password");
    }
    else res.json("Invalid Email");
  
});

app.get('/profile',(req, res) => {
   const {token} = req.cookies;

    if(token)
    {
        jwt.verify(token,secretJWT,{},async(err,userData)=>{
            if(err)
                throw err;
            const {name,email,_id}=await UserModel.findOne({email:userData.email});
            res.json({name,email,_id});
        });
    }
   
});


app.post('/logout',(req, res) => {
    res.cookie('token','').json(true);
});

app.post('/upload-by-link',async(req, res) => {
    const {link} = req.body;
    const newName = Date.now()+'.jpg';
   await imageDownloader.image({
        url: link,
        dest: __dirname+'/uploads/'+newName,
    })
    res.json(newName);
})

app.get('/test',(req,res)=>{
    res.json("ok");
})

app.listen(4000);

// 0IpWIZOaYLuUHmuC