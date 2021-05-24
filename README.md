# Pet Finder #

O Pet Finder é uma aplicação para pets abandonados encontrarem um novo lar.

**Stack**:
* React
* Flask
* MongoDB

**Requisitos** para rodar a aplicação:
* Python
* Flask
* MongoDB
* Node.js

Para rodar a **interface de usuário**: 

```cd frontend```
```npm install```
```npm run```

Para rodar a **API**:

```cd backend```
```set flask_app=app.py```
```flask run```

### Schemas ###

**User**

A coleção User possui a seguinte estrutura:

* _id
* Name (nome)
* E-mail
* Password (senha)
* Address (endereço - string com rua, número, cidade e estado)

**Pet**

* _id
* Name (nome)
* Type (tipo - chachorro ou gato)
* Breed (raça)
* Age (idade)
* Weight (peso - em kg)
* City (cidade)
* Adopted (adotado - esse propriedade não é utilizada, apenas a criei caso queira implementar uma feature de adoção no futuro)
* User ID (id do usuário atrelado ao pet - o atrelamento é feito através desta propriedade)

A coleção Pet possui a seguinte estrutura: