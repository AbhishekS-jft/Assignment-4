async function login(){
    console.log('wewegwegwegwet');
    let user={
        "email":document.getElementById("Email").value,
        "password":document.getElementById("Password").value
    }
    const res = await loginuser(user);
    if(!res)
    {
        alert("User not found");
    }
    else{
        console.log(res);
        sessionStorage.setItem('token', res.token);
        window.location.href = "index.html";
    }
}    
