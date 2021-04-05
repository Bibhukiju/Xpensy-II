

// adding event listner to the sign up button
document.getElementById("sign-up").addEventListener("click",signUp);

// constructor functoin for the new user signup

function NewUser(name,email,password) {
  this.name = name;
  this.email = email;
  this.password = password;
}

function signUp() {

  const form = document.getElementById("form");
  const username = document.getElementById("first-name")
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // getting the values of the name email and passowrd
  let newUser = new NewUser(
      username.value.trim(),
      email.value.trim(),
      password.value.trim(),
    )

  // email / password / name validation
  let t1,t2,t3;


  if(newUser.name === ''){
    setErrorFor(username,'Username cannot be blank');
  }else {
    setSuccessFor(username);
    t1 = true;
  }


  if(newUser.email === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(newUser.email)) {
    setErrorFor(email, 'Not a valid email');
  } else {
    setSuccessFor(email);
    t2 = true;
  }

  if(newUser.password === '') {
    setErrorFor(password, 'Password cannot be blank');
  } else {

    if(newUser.password.length<5) {
      setErrorFor(password, 'Password length must be greater that 5.');
    } else {
      setSuccessFor(password);
      t3 = true;
    }
  }

  /* after we get the user email, name and passoword
      trying to check whether the user has been registerd alreay or not
  */

  if(t1===true && t2===true && t3===true) {
    fetch('https://xpenc.herokuapp.com/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(newUser),
    }
  ).then(response=>{

      if(response.ok){
        return response.json();
      }else {
        return Promise.reject(response);
      }

  }).then( data=>{
      document.getElementById('form-message').innerText="Account Created Sucessfully"; 
      document.getElementById('form-message').style.color = "#155724";
      document.getElementById('form-message').style.backgroundColor = "#d4edda";
  }).catch(error=>{
      console.log(error);
      document.getElementById('form-message').innerText="User Already Registered with the email"; 
      document.getElementById('form-message').style.color = "#721c24";
      document.getElementById('form-message').style.backgroundColor = "#f8d7da"; 
  })

  } else {
    return;
  }


}


function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
  
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
