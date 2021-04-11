

// selectors
const login = document.querySelector(".btn");

// event listeners

login.addEventListener("click", function () {
  const email = document.querySelector(".fname").value;
  const password = document.querySelector(".lname").value;
  console.log(email);
  console.log(password);

  fetch("http://xpenc.herokuapp.com/signin", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else {
        return Promise.reject(response);
      }
      return Promise.reject(response);
    })
    .then((data) => {
      console.log(data);
    })
    .catch(error=>{
        console.log(error);
    });
});
