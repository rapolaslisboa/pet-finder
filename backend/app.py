from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient
from flask_jwt_extended import (create_access_token, create_refresh_token, JWTManager)
import hashlib
import datetime

app = Flask(__name__)

CORS(app, resources={
    r".*": {
        "origins": "*"
    }
})

client = MongoClient()
db = client.petfinder

app.config['JWT_SECRET_KEY'] = 'F0662B2FC6209B419EA422056809F42D2A38CCFAD0105DF4382E22A65BFC73E8'
jwt = JWTManager(app)


@app.route('/api/signin', methods=['GET', 'POST'])
def signin():
    try:
        data = request.get_json()
        current_user = db.user.find_one({"Username": data["Username"]})
        if not current_user:
            return {"error": "User not in database."}
        password = hashlib.md5(data['Password'].encode()).hexdigest()
        if current_user['Password'] == password:           
            expires = datetime.timedelta(minutes=30)
            access_token = create_access_token(
                identity=data['Username'], expires_delta=expires)
            refresh_token = create_refresh_token(identity=data['Username'])

            return {
                'username': current_user["Username"],
                'accessToken': access_token,
                'refreshToken': refresh_token
            }
        else:          
            return {'error': 'Wrong credentials. Username and/or password invalid.'}

    except:
        raise Exception("Cannot login user.")


@app.route('/api/signup', methods=['GET', 'POST'])
def signup():
    return {'error': 'Signup'}


# Retorna os pets de acordo com a cidade
@app.rout('/api/list-pets/<city>', methods=['GET'])
def list_pets(city):
    return {'error': 'There is no pets'}

app.run()

