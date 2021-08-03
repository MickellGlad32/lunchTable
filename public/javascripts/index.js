//login functions
var username = localStorage.getItem("username")
var loggedin = localStorage.getItem("loggedin")

if (loggedin === "true") { 
    let loginId = document.getElementById("profile-name")
    loginId.innerHTML="Hi, "+username
    let loggin = document.getElementById("loggin")
    const profile = document.getElementById("profile")
    const profileLinks = document.getElementById("profile-links")
    profile.style.display = "block"
    profileLinks.style.display = "block"
    loggin.style.display = "none"

document.addEventListener('click', (event) => {
    if (event.target.id == 'logout') {
        localStorage.setItem("loggedin", "false")
        profile.style.display = "none"
        profileLinks.style.display = "none"
        loggin.style.display = "block"
    }
    console.log(localStorage.getItem("username"))
    }
)}
