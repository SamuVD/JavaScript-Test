// I called the form
const registerForm = document.getElementById("register-form")

// I called each field of the form
const fullName = document.getElementById("full-name-register")
const email = document.getElementById("email-register")
const password = document.getElementById("password-register")
const confirmPassword = document.getElementById("confirm-password-register")

// I added an event listener 
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const inspectEmail = await checkEmail(email)
    const inspectPasswords = checkPasswords(password, confirmPassword)

    if (inspectEmail === true && inspectPasswords === true) {
        await registerAdmin(fullName, email, password, confirmPassword)
        window.location.href = "/"
    }
})

// register function 
async function registerAdmin(fullName, email, password, confirmPassword){
    const newAdmin = {
        fullName: fullName.value,
        email: email.value,
        password: password.value,
        confirmPassword:  confirmPassword.value
    }

    const reply = await fetch("http://localhost:3000/Admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAdmin)
    })
   const data = reply.json()
}

// Email function
async function checkEmail(email) {
    const reply = await fetch(`http://localhost:3000/Admin?email=${email.value}`);
    const data = await reply.json()
    
    console.log(data)

    if(data.length > 0){
        return false;
    }else{
        return true;
    }
}

// Passwords function
function checkPasswords(password, confirmPassword){
    if(password.value === confirmPassword.value){
        return true;
    }else{
        return false;
    }
}