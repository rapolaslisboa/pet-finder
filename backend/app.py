import datetime
import hashlib
import json

from bson import json_util
from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token, create_refresh_token)
from pymongo import MongoClient

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

# Login
@app.route('/api/signin', methods=['GET', 'POST'])
def signin():
    try:
        data = request.get_json()
        print("\nDados do usuário no login: ", data)
        current_user = db.user.find_one({"E-mail": data["E-mail"]})

        if not current_user:
            return {"error": "Usuário não está cadastrado no banco de dados."}

        password = hashlib.md5(data['Password'].encode()).hexdigest()

        if current_user['Password'] == password:           
            expires = datetime.timedelta(minutes=30)
            access_token = create_access_token(
                identity=data['E-mail'], expires_delta=expires)
            refresh_token = create_refresh_token(identity=data['E-mail'])

            return {
                'e-mail': current_user["E-mail"],
                'accessToken': access_token,
                'refreshToken': refresh_token
            }

        else:          
            return {'error': 'Credenciais erradas. Nome de usuário e/ou senha inválido (os).'}

    except:
        raise Exception("Usuário não pode logar.")


# Cadastro
@app.route('/api/signup', methods=['GET', 'POST'])
def signup():
    try:
        data = request.get_json()
        print("\nDados do usuário no cadastro: ", data)
        email_not_used = db.user.find_one({"E-mail": data["E-mail"]})

        if not email_not_used:
            return {"error": "Esse e-mail já foi utilizado."}

        db.user.insert_one(data)

        return {"success": "Usuário cadastrado com sucesso!"}

    except:
        raise Exception("Não é possível realizar o cadastro.")


# Retorna os pets de acordo com a cidade
@app.route('/api/list-pets', methods=['GET'])
@app.route('/api/list-pets/<city>', methods=['GET'])
def list_pets(city=None):
    if city == None:
        filtered_pets = db.pets.find({})
        return json.dumps(filtered_pets, default=json_util.default)
    else:    
        filtered_pets = db.pets.find({"City": city})
        if db.pets.find({"City": city}).count() > 0:
            return json.dumps(filtered_pets, default=json_util.default)
        return {'error': 'Não há pets cadastrados nessa cidade.'}


if __name__ == "__main__":
    app.run()

