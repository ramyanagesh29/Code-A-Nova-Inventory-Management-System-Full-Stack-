const registerForm = document.getElementById("registerForm");
console.log("Register JS Loaded");
registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/api/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            password
        })

    });

    const data = await response.json();

    if(response.ok){

        alert("Registration Successful!");

        window.location.href="login.html";

    }else{

        alert(data.message);

    }
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Register button clicked");

    // ...
});
});