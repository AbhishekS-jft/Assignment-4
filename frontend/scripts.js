var ARR=[]; // Global Array
var ID; // For id in json
async function load(){
    var arr = await display()
    ARR=arr;
    table(arr)
}
load();
function table(arr)    // Making Dynamic Table
{
    var html = "<table><tr> <th>S No.</th>"+
    " <th> Name <button class='btnUp' onclick='AscName()'> <i class='fa fa-arrow-up' aria-hidden='true'></i> </button> <button class='btnDown' onclick='DescName()'> <i class='fa fa-arrow-down' aria-hidden='true'></i> </button> </th> "+
    " <th>Job <button class='btnUp' onclick='AscJob()'> <i class='fa fa-arrow-up' aria-hidden='true'></i> </button> <button class='btnDown' onclick='DescJob()'> <i class='fa fa-arrow-down' aria-hidden='true'></i> </button> </th>"+
    "<th>Salary <button class='btnUp' onclick='AscSal()'> <i class='fa fa-arrow-up' aria-hidden='true'></i> </button> <button class='btnDown' onclick='DescSal()'> <i class='fa fa-arrow-down' aria-hidden='true'></i> </button> </th>"+
    " <th>Edit</th> <th>Delete</th></tr>";
    for(let i=1;i<=arr.length;i++)
    {
        html+="<tr>";
        html+="<td>"+i+"</td>";
        html+="<td>"+arr[i-1].name+"</td>";     //i-1 -> for 0 based indexing , S.no now starts with 1
        html+="<td>"+arr[i-1].job+"</td>";
        html+="<td>"+arr[i-1].sal+"</td>";
        html+="<td><button id="+(i-1)+" onclick='edit(this.id)'>Edit</button>"+"</td>";
        html+="<td><button id="+(i-1)+" onclick='Delete(this.id)'>Delete</button>"+"</td>"; 
        html+="</tr>";
    }
        html+="</table>";
        document.getElementById("box").innerHTML=html;
    };

async function Add()  //taking user-input data
{
    let Name=document.getElementById("name").value;
    let Sal=document.getElementById("sal").value;
    let Job=document.getElementById("job").value;
    // if(Name==0 || Sal==0 || Job==0)
    // {
    //     alert("Fields are Empty");
    //     return;
    // }
    // const uid = localStorage.getItem('uid')
    let obj={
        name:Name,
        sal:Sal,
        job:Job
    };
    // localStorage.setItem("details",JSON.stringify(obj));
    // details.push(obj);
    await addEmployee(obj);
    // setData();
    table();
    clean();
}

function clean()
{
    document.getElementById("name").value="";
    document.getElementById("job").value="";
    document.getElementById("sal").value="";
}

function edit(index)
{
    document.getElementById("name").value=ARR[index].name;
    document.getElementById("sal").value=ARR[index].sal;
    document.getElementById("job").value=ARR[index].job;
    document.getElementById("add").disabled=true;
    document.getElementById("update").disabled=false;  
    ID=ARR[index].id;
    // INDEX=index;
}

async function update()
{
    let new_name=document.getElementById("name").value;
    let new_sal=document.getElementById("sal").value;
    let new_job=document.getElementById("job").value;
    // if(new_name==0 || new_sal==0 || new_job==0)
    // {
    //     alert("Fields are Empty");
    //     return;
    // }
    let obj={
        name:new_name,
        job:new_job,
        sal:new_sal,
        id:ID
    }
    ARR=await Edit(obj,ID); 
    // const element =ARR.find(emp => emp.id === ID)
    // element = await Edit(obj,ID);
    table(ARR);
    document.getElementById("add").disabled=false;
    document.getElementById("update").disabled=true; 
    clean();
}

async function Delete(index)
{
    let i= ARR[index].id;
    console.log(i);
    ARR=await DeleteEmp(i);  // Deleting from Array in Api.js
    // console.log(index);
    table(ARR);
}

function AscSal()
{
    ARR.sort((a,b)=>{
        return a.sal-b.sal;
    })
    table(ARR);
}

function DescSal()
{
    ARR.sort((a,b)=>{
        return b.sal-a.sal;
    })
    table(ARR);
}

function AscJob()
{
    ARR.sort((a,b)=>{
        let fa=a.job.toUpperCase(),fb=b.job.toUpperCase();

        if(fa>fb){
            return 1;
        }    
        if(fa<fb){
            return -1;
        }    
        return 0;    
    })
    table(ARR);
}

function DescJob()
{
    ARR.sort((a,b)=>{
        let fa=a.job.toLowerCase(),fb=b.job.toLowerCase();
        if(fa<fb){
            return 1;
        }    
        if(fa>fb){
            return -1;
        }    
        return 0;    
    })
    table(ARR);
}

function AscName()
{
    ARR.sort((a,b)=>{
        let fa=a.name.toLowerCase(),fb=b.name.toLowerCase();

        if(fa<fb){
            return -1;
        }    
        if(fa>fb){
            return 1;
        }    
        return 0;    
    })
    table(ARR);
}

function DescName()
{
    ARR.sort((a,b)=>{
        let fa=a.name.toLowerCase(),fb=b.name.toLowerCase();

        if(fa<fb){
            return 11;
        }    
        if(fa>fb){
            return -1;
        }    
        return 0;    
    })
    table(ARR);
}