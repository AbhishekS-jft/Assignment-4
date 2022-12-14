const User=require('../models/productmodel');

// get all products
async function getUsers(req,res)
{
    try {
        const users=await User.find();
        console.log(users);
        // res.writeHead(200,{'Content-Type':'application/json'})
        // console.log(users);
        console.log(users);
        res.json(users)
        
    } catch (error) {
        console.log("ERROR in FINDING",error);
    }
}

async function getUser(req,res,id)
{
    try {
            const user=await User.findbyId(id);
            console.log(user); 
            res.json(user); 
        } catch (error) {
        console.log(error);
    }
}
// create a user
//post request
async function createUser(req,res)
{
    try {
            let temp=req.body   
            const user=await User.create(temp);
            console.log(user);
            res.json(user);
        } 
        catch (error) {
        console.log(error);
    }
}
//updating a user
//put request
async function updateUser(req,res,id){
    const user=await User.findbyId(id);
    if(!user)   //if that user doesn't exist
    {
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end("<h1>User does not exist </h1>");
    }
    else{
        try{
            let temp=req.body 
            const user=await User.update(temp,id);
            console.log(user);
            res.json(user);
        }
        catch(error){
            console.log(error);
        }
    }
}
//delete user
async function removeUser(req,res,id){
        try{
            console.log(id);
            await User.deleteUser(id);
            res.end(JSON.stringify({message:`${id} is removed`}));
        }
        catch(error){
            console.log(error);
        }
}
// exporting functions
module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    removeUser
}