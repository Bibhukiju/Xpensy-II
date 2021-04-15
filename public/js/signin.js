

// selectors
const login = document.querySelector(".btn");
const heropageright=document.querySelector(".heropage_container_right");

// event listeners
console.log("hellow world");
// login.addEventListener("click", function () {
//   const email = document.querySelector(".fname").value;
//   const password = document.querySelector(".lname").value;
//   console.log(email);
//   console.log(password);

//   fetch("http://xpenc.herokuapp.com/signin", {
//     method: "POST",
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         // return response.json();
//         // alert("hey there ");
//         console.log(response.json());
//         const loginrespose=document.createElement("div");
//         loginrespose.classList.add("login_response");
//         loginrespose.innerText="login successful";
//         heropageright.appendChild(loginrespose);
//         setTimeout(() => {
//           loginrespose.remove();
//         }, 2000);

//         document.cookie = "username=John Doe";
//         const test=JSON.parse(response.body);
//         console.log(test);

//       }else {
//         // return Promise.reject(response);
//         const loginrespose=document.createElement("div");
//         loginrespose.classList.add("login_response");
//         loginrespose.innerText="invalid credentials";
//         heropageright.appendChild(loginrespose);
//         setTimeout(() => {
//           loginrespose.remove();
//         }, 2000);
//       }
//       // return Promise.reject(response);
//     })
//     // .then((data) => {
//     //   console.log(data);
//     // })
//     .catch(error=>{
//         console.log(error);
//     });
// });







// async await ko laagi
login.addEventListener("click", async function(){
  const email = document.querySelector(".fname").value;
  const password = document.querySelector(".lname").value;

try {
  let response=await fetch("http://xpenc.herokuapp.com/signin", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
   },
  })
response=await response.json();
console.log(response);
if(response.token){
const loginrespose=document.createElement("div");
       loginrespose.classList.add("login_response");
       loginrespose.innerText="login successful";
       heropageright.appendChild(loginrespose);
       setTimeout(() => {
         loginrespose.remove();
        window.location.href="http://127.0.0.1:5501/public/index.html";
       }, 2000);
       
       document.cookie=`token=${response.token}`;
}
else{
const loginrespose=document.createElement("div");
   loginrespose.classList.add("login_response");
   loginrespose.innerText="invalid credentials";
   heropageright.appendChild(loginrespose);
   setTimeout(() => {
     loginrespose.remove();
   }, 2000);
}
} catch (error) {
  console.log(error);
}
})