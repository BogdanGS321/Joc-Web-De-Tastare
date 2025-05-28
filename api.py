from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import sqlite3, random

DB = "DBProiect.db"
app = Flask("api")
CORS(app)

@app.route("/", methods =["GET"])
def home():
    return render_template("SignIn.html")

@app.route("/main", methods =["GET"])
def mainpage():
    return render_template("Main.html")

@app.route("/signin", methods =["POST", "GET"])
def signin():
     if request.method == "GET":
        return render_template("SignIn.html")
     if request.method == "POST":

        body = request.json

        if body["username"] is None:
            response = {
            "error": "Missing username."
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 400
        
        if body["password"] is None:
            response = {
            "error": "Missing password."
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 400
        
        connection = sqlite3.connect(DB)
        cursor = connection.cursor()
        query = f"SELECT IDJucator, Username, Parola, Admin FROM Jucatori where Username ='{body['username']}'"
        dateUser = list(cursor.execute(query))[0] 
        if len(dateUser) > 0: 
            if body["password"] != dateUser[2]:
                response = {
                    "message": "Parola invalida"
                }
                response = jsonify(response)
                response.headers.add("Access-Control-Allow-Origin", "*")
                return response, 400
            
            IDJucator = dateUser[0]
            Username = dateUser[1]
            Admin = dateUser[3]
            connection.close()
            response = {
                "IDJucator": IDJucator,
                "Username": Username,
                "Admin": Admin
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 200
        else:
            response = {
                "message": "Acest utilizator nu exista"
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 400



@app.route("/signup", methods =["POST", "GET"])
def add(): 
    if request.method == "GET":
        return render_template("SignUp.html")
    if request.method == "POST":

        body = request.json

        if body["username"] is None:
            response = {
            "error": "Missing username."
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 400
        
        if body["password"] is None:
            response = {
            "error": "Missing password."
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 400

        if body["password"] != body["confirm_password"]:
            response = {
            "error": "Password mismatch."
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 400

        #3. Conectare la DB
        connection = sqlite3.connect(DB)
        cursor = connection.cursor()

        #4. Adaugare date
        query = f"INSERT INTO Jucatori (Username, Parola) VALUES ('{body['username']}', '{body['password']}')"
        cursor.execute(query)
        connection.commit()
        query = f"SELECT IDJucator, Username, Admin FROM Jucatori WHERE Username = ('{body['username']}')"
        IDUser = list(cursor.execute(query))[0][0]
        Username = list(cursor.execute(query))[0][1]
        Admin = list(cursor.execute(query))[0][2]
        response = {
                "IDJucator": IDUser,
                "Username": Username,
                "Admin": Admin  
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        connection.close()
        return response, 200

@app.route("/play", methods = ["GET"])
def play():
    return render_template("Play.html")

@app.route("/admin", methods = ["GET", "POST"])
def admin():
    if request.method == "GET":
        return render_template("Admin.html")
    if request.method == "POST":
        body = request.json
        connection = sqlite3.connect(DB)
        cursor = connection.cursor()
        query = f"SELECT IDJucator, Username, Parola FROM Jucatori WHERE Username = ('{body['Username']}')"
        Date = list(cursor.execute(query))
        print(Date)
        ID = Date[0][0]
        Username = Date[0][1]
        Parola = Date[0][2]
        response = {
            "Username": Username,
            "Parola": Parola,
            "ID": ID
        }
        response = jsonify(response)
        connection.close()
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200
        
@app.route ("/admin/save", methods = ["POST"])
def save():
    body = request.json
    connection = sqlite3.connect(DB)
    cursor = connection.cursor()
    query = f"INSERT INTO Jucatori (Username, Parola) VALUES ('{body['Username']}', '{body['Parola']}') WHERE IDJucator = ('{body['ID']}')"
    cursor.execute(query)
    connection.commit()
    connection.close()
    return "", 200

   

if __name__ == "__main__":
    app.run(debug=True, port=8000)
