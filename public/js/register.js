document.getElementById("registerForm")
.addEventListener("submit", async(e)=>{

e.preventDefault();

const data={

nom:nom.value,

prenom:prenom.value,

email:email.value,

password:password.value

};

const response=await fetch("/api/users/register",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

const result=await response.json();

alert(result.message);

});