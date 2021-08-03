

document.addEventListener('click', (event) => {
    if (event.target.id == 'logout') {
        localStorage.setItem("loggedin", "false")
        profile.style.display = "none"
        profileLinks.style.display = "none"
        loggin.style.display = "block"
    }
    console.log(localStorage.getItem("username"))
    }
)