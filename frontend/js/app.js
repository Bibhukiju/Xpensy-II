//functions
const data = {
  email: "bibhukiju11@gmail.com",
  password: "100000000",
};
function submitData() {
  fetch("http://localhost:3000/signin", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
}

submitData();
