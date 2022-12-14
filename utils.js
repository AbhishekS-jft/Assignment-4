const fs=require('fs');
function writeData(file,data)   //writing data back tojson file
{
    fs.writeFileSync(file,JSON.stringify(data),'utf-8',(err)=>{
        if(err)
        {
            console.log(err);
        }
    })
}

module.exports={
    writeData
}