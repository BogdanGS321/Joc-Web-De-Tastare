const Admin = localStorage.getItem("Admin");
if (Admin != 1) {
    window.location.replace("../main");
}

const ElementInput = document.getElementById("search");
const ElementNewUsername = document.getElementById("NewUsername");
const ElementNewPassword = document.getElementById("NewPassword");
const ButonSave = document.getElementById("Save");
const ButonDelete = document.getElementById("deleteButton");
let IDPlayer = 0

function search() {
    const Search = ElementInput.value;
    console.log(Search)
    const SearchData = {
        "Username": Search
    };

    const DataJSON = JSON.stringify(SearchData);
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8000/admin");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = processRequestToSendDataResponse;
    request.onerror = processErrorResponse; 
    request.send(DataJSON);

    function processRequestToSendDataResponse() {
        const response = JSON.parse(request.response);

        if (request.status == 200) {
            ElementNewUsername.disabled = false;
            ElementNewPassword.disabled = false;
            ButonSave.disabled = false;
            ButonDelete.disabled = false;
            ElementNewUsername.innerText = response.Username;
            ElementNewPassword.innerText = response.Parola;
            IDPlayer = response.ID
        }
    }
    
    function processErrorResponse() {
        const response = JSON.parse(request.response);
        
        if (request.status == 400 || request.status == 500) {
            const errorMessage = document.getElementById("error-message");
            if (errorMessage) {
                errorMessage.innerText = response.message;
            } else {
                const p = document.createElement("p");
                p.id = "error-message"
                p.innerText = response.message;
                p.className = "error-message";
                const body = document.getElementsByTagName("body")[0];
                body.appendChild(h1);
            }
        }
    }
}



function save() {
    const DateNoi = {
        "Username" : ElementNewUsername.value,
        "Parola": ElementNewPassword.value,
        "ID": IDPlayer
    };

    const DataNew = JSON.stringify(DateNoi);
    const requestNew = new XMLHttpRequest();
    requestNew.open("POST", "http://localhost:8000/admin/save");
    requestNew.setRequestHeader("Content-Type", "application/json");
    requestNew.onload = processRequestToSendDataResponse;
    requestNew.onerror = processErrorResponse; 
    requestNew.send(DataNew);

    function processRequestToSendDataResponse() {
        const response = JSON.parse(request.response);
    }
    
    function processErrorResponse() {
        const response = JSON.parse(request.response);
        
        if (request.status == 400 || request.status == 500) {
            const errorMessage = document.getElementById("error-message");
            if (errorMessage) {
                errorMessage.innerText = response.message;
            } else {
                const p = document.createElement("p");
                p.id = "error-message"
                p.innerText = response.message;
                p.className = "error-message";
                const body = document.getElementsByTagName("body")[0];
                body.appendChild(h1);
            }
        }
    }
}