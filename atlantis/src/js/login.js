// I called the form
const loginForm = document.getElementById("login-form")

// I called each field of the form
const email = document.getElementById("email-login")
const password = document.getElementById("password-login")

// I added an event listener 
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault()
    let admin = await checkEmail(email)
    if (admin === false) {
        alert("Email does not exist")
    }

    if (admin.password != password.value) {
        alert("Incorrect Password ")

    }
    localStorage.setItem("adminOnline", JSON.stringify(admin))
    window.location.href = "http://localhost:5173/src/pages/dashboard.html"
})

// Email function
async function checkEmail(email) {
    const reply = await fetch(`http://localhost:3000/admin?email=${email.value}`);
    const data = await reply.json()

    console.log(data)

    if (data.length === 1) {
        return data[0];
    } else {
        return false;
    }
}