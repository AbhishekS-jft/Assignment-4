// let Emparr=[]   //Global Array

async function registeruser(user){
   const res= await fetch("http://localhost:4000/employees/register",{
    method: 'POST',
    headers: {
        Accept:"application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(user)
   });
//    console.log(await res.json());
   return res;
}

async function loginuser(user){
    // const token=sessionStorage.getItem('token');
    const res=await fetch("http://localhost:4000/employees/login",{
    method :'POST',
    headers: {
        Accept:"application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`
    },
    body:JSON.stringify(user)
    });
    // console.log(await res.json())
    return await res.json();
}

async function addEmployee(obj)   //Adding Employee
{
    let token=sessionStorage.getItem('token');
    if(!token)
    {
        throw new Error("Session Expired");
    }
    else{
        const res=await fetch("http://localhost:4000/employees",{
            method: 'POST',
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify(obj)
        })
        return res.json;    
    }  
}

// function getArr() { //Returning array to app.js
//     return Emparr;
// }

async function DeleteEmp(id)  //Deleting Employee
{
    let token=sessionStorage.getItem('token');
    if(!token)
    {
        throw new Error("Session expired");
    }
    else{
        await fetch(`http://localhost:4000/employees/${id}`,{
        method:"DELETE",
        Authorization:`Bearer ${token}`
    });}
    
}

async function Edit(obj,ID)
{
    let token=sessionStorage.getItem('token');
    if(!token)
    {
        throw new Error("Session Expired");
    }
    else
    {
        const o=await fetch(`http://localhost:4000/employees/${ID}`,{
            method:"PUT",
            headers:{
                Accept:"application/json",
                "Content-type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(obj)
        });
        return await o.json();
    }
}

async function display()
{
    let token=sessionStorage.getItem('token');
    console.log('token: ',token);
    if(!token)
    {
        throw new Error("Session expired");
    }
    else{
        const emp=await fetch('http://localhost:4000/employees',{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`,
            // "Content-Type":"application/json"
        }
    });
    return await emp.json();
}
}