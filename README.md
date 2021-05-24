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

## Schemas ##

### User ###

A coleção User possui a seguinte estrutura:

* _id (id do usuário)
* Name (nome)
* E-mail
* Password (senha)
* Address (endereço - string com rua, número, cidade e estado)

Exemplo de documento:

![image](https://user-images.githubusercontent.com/36749168/119285805-32708e00-bc43-11eb-8791-0540fdebd038.png)


### Pet ###

A coleção Pet possui a seguinte estrutura:

* _id (id do pet)
* Name (nome)
* Type (tipo - Cachorro ou Gato)
* Breed (raça)
* Age (idade)
* Weight (peso - em kg)
* City (cidade)
* Adopted (adotado - esse propriedade não é utilizada, apenas criei caso queira implementar uma feature de adoção no futuro)
* User ID (id do usuário atrelado ao pet - o atrelamento é feito através desta propriedade)

Exemplo de documento:

![image](https://user-images.githubusercontent.com/36749168/119285751-09e89400-bc43-11eb-9822-e762dba9f851.png)
