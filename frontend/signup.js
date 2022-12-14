async function register(){
    let user={
        "email":document.getElementById("Email").value,
        "password":document.getElementById("Password").value,
    }
    const res = await registeruser(user);
    if(!user){
        console.log("Error in registring user");
    }
    else{
        alert('User Registered successfully');
    }
}