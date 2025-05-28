function submit(){

const inputs = document.getElementsByTagName("input");
    console.log(inputs[0].value)
    const username = inputs[0].value;
    const password = inputs[1].value; 
    const data = {
        "username": username,
        "password": password
    };
    const jsonData = JSON.stringify(data);

    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8000/signin");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = processRequestToSendDataResponse;
    request.onerror = processErrorResponse; 
    request.send(jsonData);

    function processRequestToSendDataResponse() {
        const response = JSON.parse(request.response);

        if (request.status == 200) {
            localStorage.setItem("IDJucator", response.IDJucator)
            localStorage.setItem("Username", response.Username);
            localStorage.setItem("Admin", response.Admin)
            window.location.replace("../main")
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