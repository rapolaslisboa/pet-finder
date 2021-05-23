import datetime
import hashlib
import json

from bson import json_util
from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token)
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
@app.route('/api/signin', methods=['POST'])
def signin():
    try:
        data = request.get_json()
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
                'email': current_user["E-mail"],
                # 'userID': current_user["_id"],
                'city': current_user["Address"].split(", ")[2],
                'accessToken': access_token,
                'refreshToken': refresh_token
            }

        else:
            return {'error': 'Credenciais erradas. Nome de usuário e/ou senha inválido (os).'}

    except:
        raise Exception("Usuário não pode logar.")


# Cadastro de usário
@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email_not_used = db.user.find_one({"E-mail": data["E-mail"]})

        if email_not_used != None:
            return {"error": "Esse e-mail já foi utilizado."}

        data["Password"] = hashlib.md5(data['Password'].encode()).hexdigest()
        data["Address"] = data["Street"] + ", " + data["Number"] + \
            ", " + data["City"] + ", " + data["State"]
        del data["Street"]
        del data["Number"]
        del data["City"]
        del data["State"]

        db.user.insert_one(data)
        client.close()

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


# Cadastro de pet
@app.route('/api/register-pet', methods=['POST'])
def register_pet():
    try:
        data = request.get_json()
        user = db.user.find_one({"E-mail": data["E-mail"]})
        data["Age"] = int(data["Age"])
        data["Weight"] = float(data["Weight"])
        data["Adopted"] = False
        data["User ID"] = user["_id"]
        del data["E-mail"]
        db.pet.insert_one(data)
        client.close()

        return {"success": "Pet cadastrado com sucesso!"}

    except:
        raise Exception("Não é possível realizar o cadastro.")


# Remoção de pet
@app.route('/api/delete-pet', methods=['DELETE'])
def delete_pet():
    try:
        data = request.get_json()
        if db.pet.find({"_id": data["_id"]}).count() == 1:
            db.find.delete_one({"_id": data["_id"]})
        return {"success": "Pet deletado com sucesso!"}

    except:
        raise Exception("Não é realizar a deleção.")


# Edição de pet
@app.route('/api/update-pet', methods=['PUT'])
def update_pet():
    try:
        data = request.get_json()
        if db.pet.find({"_id": data["_id"]}).count() == 1:
            db.pet.update_one({"_id": data["_id"]}, {"$set": {
                "Name": data["Name"], "Type": data["Type"], "Breed": data["Breed"],
                "Age": data["Age"], "Weight": data["Weight"], "City": data["City"]}}, upsert=False)
        return {"success": "Pet atualizado com sucesso!"}

    except:
        raise Exception("Não é realizar a edição.")


# Adoção de pet - não implementado pois a ideia é a pessoa interessada entrar em contato com o anunciante através de e-mail
@app.route('/api/adopt-pet', methods=['PUT'])
def adopt_pet():
    try:
        data = request.get_json()
        if db.pet.find({"_id": data["_id"]}).count() == 1:
            db.pet.update_one({"_id": data["_id"]}, {
                              "$set": {"Adopted": True}}, upsert=False)
        return {"success": "Pet adotado com sucesso!"}

    except:
        raise Exception("Não é realizar a adoção.")


if __name__ == "__main__":
    app.run()
