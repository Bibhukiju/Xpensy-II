
const getExpense=async function(){
    let token=document.cookie;
    token=token.split("=")[1];
    console.log(token);
    if(token===""){
      return  window.location.href="http://127.0.0.1:5501/public/signin.html";
    }
    
    let response=await fetch("http://xpenc.herokuapp.com/",
    {
     headers:{
        "Authorization": `Bearer ${token}`,
     }
    }
    )
    response=await response.json();
    console.log(response);
    for(let i of response){
        const container=document.querySelector(".container");
        console.log(i);
        const div=document.createElement("div");
        div.classList.add("divs");
        div.innerText=i.amount;
        container.appendChild(div);
        
    }
}

getExpense();



