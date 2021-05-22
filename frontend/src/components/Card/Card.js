import React from "react";
import CatImg from "../../assets/images/cat.jpg";
import DogImg from "../../assets/images/dog.jpg";
import classes from "./Card.module.css";

const Card = (props) => {
  const { element } = props;
  return (
    <div className={classes.PetCard}>
      <div className={classes.PetImage}>
        <img src={element.Type === "Gato" ? CatImg : DogImg} />
      </div>
      <ul>
        <li><strong>Nome</strong>: {element.Name}</li>
        <li><strong>Raça</strong>: {element.Breed}</li>
        <li><strong>Idade</strong>: {element.Age}</li>
        <li><strong>Peso</strong>: {element.Weight}kg</li>
        <li><strong>Cidade</strong>: {element.City}</li>
        <li><strong>Contato</strong>: {element["User ID"]}</li>
      </ul>
      <div>
        <button className={classes.AdoptButton}>Adotar</button>
      </div>
    </div>
  );
};

export default Card;
