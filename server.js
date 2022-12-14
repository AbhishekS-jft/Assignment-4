const express=require('express');
require("dotenv").config();
const bodyParser=require('body-parser');
const {getUsers,getUser,createUser,updateUser,removeUser}=require('./controllers/productController');
const cors=require('cors');
const app=express();
app.use(cors());
const fs= require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users=require('./user.json');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const verifyUserToken=(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized Request");
    }
    const token=req.headers['authorization'].split(' ')[1];
    if(!token){
        return res.status(401).send("Access Denied, No token is provided");
    }
    try{
        const decoded=jwt.verify(token,"Secret Message");
        req.user=decoded.user;
        next();
    }
    catch(err){
            res.status(401).send("Invalid Token");
}
}

app.get('/employees/users',verifyUserToken,(req,res)=>{
    res.json(users);
});

app.post('/employees/register',async (req,res)=>{
    const user=req.body;
    if(!user.email || !user.password)
    {
        return res.status(400).send("Username and password are required");
    }
    const hash=await bcrypt.hash(user.password,10);
    user.password=hash;
    // console.log(user.password);
    users.push(user);
    fs.writeFileSync('./user.json',JSON.stringify(users),'utf8',(err)=>{
        if(err){
            console.log(err);
        }
    });
    res.json(user);
});

app.post('/employees/login',async (req,res)=>{
    const nuser=req.body;
    const foundUser=users.find((user)=>user.email===nuser.email);
    if(!foundUser)
    {
        return res.status(400).send("Invalid email or password");
    }
    // if password is correct
    const isPasswordValid=await bcrypt.compare(nuser.password,foundUser.password);
    if(!isPasswordValid)
    {
        return res.status(400).send("Invalid email or password!!!!!!!!!!");
    }
    const token=jwt.sign({nuser},"Secret Message",{
        expiresIn: '1h',
    });
    // console.log("token: ", token);
    res.json({token});
});

app.get('/employees',verifyUserToken,(req,res)=>{
    getUsers(req,res);
})
app.get('/employees/:id',verifyUserToken,(req,res)=>{
    getUser(req,res,parseInt(req.params.id));
})
app.post('/employees',verifyUserToken,(req,res)=>{
    createUser(req,res);
})
app.put('/employees/:id',verifyUserToken,(req,res)=>{
    updateUser(req,res,parseInt(req.params.id));
})
app.delete('/employees/:id',verifyUserToken,(req,res)=>{
    removeUser(req,res,parseInt(req.params.id));
})
app.listen(4000,()=>{
    console.log('Listening on port 4000');
})