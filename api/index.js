const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader=require('image-downloader');
const multer=require('multer');
const fs=require('fs');
const UserModel = require('./models/user.js');
const PlaceModel = require('./models/place.js');
const BookingModel = require('./models/booking.js');
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

mongoose.connect(process.env.MONGODB_URL);

//USER

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
        else {
            try {
                throw new Error("Invalid Password");
            }
            catch(e){
                res.status(422).json({error:e.message});
            }
        }
    }
    else {
        try {
            throw new Error("User not found");
        }
        catch(e){
            res.status(422).json({error:e.message});
        }
    }
  
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

// USER_PLACES
app.post('/upload-by-link',async(req, res) => {
    const {link} = req.body;
    const newName = Date.now()+'.jpg';
   await imageDownloader.image({
        url: link,
        dest: __dirname+'/uploads/'+newName,
    })
    res.json(newName);
})

const photoMiddle=multer({dest:'uploads/'});
app.post('/upload', photoMiddle.array('photos',100), (req, res) => {
    const uploadedFiles=[];
    for (let i=0;i<req.files.length;i++){
            const {path,originalname} = req.files[i];
            const parts=originalname.split('.');
            const ext=parts[parts.length-1];
            const newPath = path+'.'+ext;
            fs.renameSync(path,newPath);
            uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
    
})

app.post('/add-place', (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, photos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuest,
        price,
    } = req.body;

    jwt.verify(token, secretJWT, {}, async (err, userData) => {
        if (err) {
            console.error('JWT verification failed:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const place = await PlaceModel.create({
                owner: userData.id, title, address,
                photos, description, perks,
                extraInfo, checkIn, checkOut,
                maxGuest, price,
            });
            return res.json(place);
        } catch (err) {
            console.error('Error creating place:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

app.put('/save-place/:id', async(req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address,
        description, photos, perks,
        extraInfo, checkIn, checkOut,
        maxGuest, price,
    } = req.body;
    jwt.verify(token, secretJWT, {}, async (err, userData) => {
        if(err)throw err;
        const placeInfo= await PlaceModel.findById(id);
        if(userData.id==placeInfo.owner){
        
            placeInfo.set({
                title,address,description,
                photos,perks,extraInfo,
                checkIn,checkOut,maxGuest,
                price,
            })
            await placeInfo.save();
            res.json('saved');
        }
    })
})


app.get('/places',(req,res) =>{
    const { token } = req.cookies;
    jwt.verify(token, secretJWT, {}, async (err, userData) => {
        const {id}=userData;
        res.json(await PlaceModel.find({owner:id}));
    })
});


app.get('/user-booking',(req,res)=>{
    const { token } = req.cookies;
   try{ jwt.verify(token, secretJWT, {}, async (err, userData) => {
        if(err)throw err;
        const {id}=userData;
        res.json(await BookingModel.find({user:id}).populate('place'));
    })}
    catch(e){
        res.json({error:e.message});
    }
})


//PLACE_DISPLAY
app.get('/place-display',async(req,res) =>{
    res.json(await PlaceModel.find());
});

app.get('/places/:id',async(req,res) =>{
    res.json(await PlaceModel.findById(req.params.id));
});

//BOOKING
app.post('/booking',async(req,res)=>{
    const { token } = req.cookies;
    const {place,checkIn,checkOut,
        name,phone,price,guests,ownedBy}=req.body;
jwt.verify(token, secretJWT, {}, async (err, userData) => {
    
    try {
        if(!userData)throw new Error("Login to book");
        if(err)throw err;
        const {id}=userData;
            if(ownedBy==id){
                throw new Error("Owner can't book use another account");
            }
            const placeBook = await BookingModel.create({place,user:id,checkIn,
                checkOut,name,phone,price,guests});
             res.json(placeBook);
        } catch (err) {
            
             res.status(500).json({ error: err.message });
        }
})
});



//DEV_TEST
app.get('/test',(req,res)=>{
    res.json("ok");
})

app.listen(4000);

// 0IpWIZOaYLuUHmuC