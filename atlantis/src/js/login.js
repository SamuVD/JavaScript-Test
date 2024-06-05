// I called the form
const loginForm = document.getElementById("login-form")

// I called each field of the form
const email = document.getElementById("email-login")
const password = document.getElementById("password-login")

// Admin function
(function (){
    const adminOnline = localStorage.getItem('adminOnline')
    if(adminOnline != null){
        window.location.href = "/src/pages/dashboard.html"
    }
})()

// I added an event listener 
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault()
    let admin = await checkEmail(email)
    if (admin === false) {
        alert("Email does not exist")
    } else {
        if (admin.password === password.value) {
            localStorage.setItem("adminOnline", JSON.stringify(admin))
            window.location.href = "./src/pages/dashboard.html"
        } else {
            alert("Incorrect Password ")
        }
    }
})

// Email function
async function checkEmail(email) {
    const reply = await fetch(`http://localhost:3000/admin?email=${email.value}`);
    const data = await reply.json()
    
    console.log(data)

    if(data.length > 0){
        return false;
    }else{
        return true;
    }
}