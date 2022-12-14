const db=require('../db.json')
const {writeData}=require('../utils')
function find(){
    return new Promise((resolve,reject)=>{
        resolve(db);
    })
}

function findbyId(id){
    return new Promise((resolve,reject)=>{
        const i=db.find((j)=>j.id==id);
        // console.log(id);
        // console.log(i);
        resolve(i);
    })
}

function create(user)
{
    return new Promise((resolve,reject)=>{
        let new_id=Math.max(...db.map(i=>i.id)); // Finding maximum id in json
        new_id++;   // now, incrementing that id
        const new_user={id:new_id,...user};
        db.push(new_user);
        writeData('db.json',db);
        resolve(new_user);
    });
}

function update(new_user,Id)
{
    return new Promise((resolve,reject)=>{
        const index=db.findIndex((i)=>i.id==Id);
        db[index].name=new_user.name;
        db[index].job=new_user.job;
        db[index].sal=new_user.sal;
        writeData('db.json',db);
        resolve(db[index]);

    })
}

function deleteUser(Id)
{
    return new Promise((resolve,reject)=>{
        const index=db.findIndex((i)=>i.id==Id);
        db.splice(index,1);
        writeData('db.json',db);
        resolve();
    })
}
module.exports={
    find,
    findbyId,
    create,
    update,
    deleteUser
}