const ID = localStorage.getItem("IDJucator")
const Username = localStorage.getItem("Username")
const Admin = localStorage.getItem("Admin")
console.log(Admin)
if (ID == null || Username == null) {
    window.location.replace("../signin")
    }
else {
    const elementUsername = document.getElementById("Username")
    elementUsername.innerText = Username 
}
if (Admin == 1) {
    console.log("admin online")
    const adminButton = document.createElement("button");
    adminButton.innerText = "Admin";
    adminButton.setAttribute('onclick', 'admin()');
    document.body.appendChild(adminButton)
}

function admin() {
    window.location.replace("../admin")
}


function play() {
    window.location.replace("../play")
}


function stats() {

}