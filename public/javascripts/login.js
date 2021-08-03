// Log in info
var username = document.getElementById("login-username")
var password = document.getElementById("login-password")

//log in function
document.addEventListener('click', (event) => {
    if (event.target.id == 'log-in') {
        event.preventDefault();
        if ( username.value == localStorage.getItem("username") || username.value == localStorage.getItem("email") ){
            localStorage.setItem("loggedin", "true")
            window.location = "./homepage.html";
        }
    }
})
