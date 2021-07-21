import axios from "../../API";
import React from "react";
import { Link } from "react-router-dom";
import CatImg from "../../assets/images/cat.jpg";
import DogImg from "../../assets/images/dog.jpg";
import { usePetContext } from "../../contexts/PetContext";
import classes from "./Card.module.css";

const Card = (props) => {
  const { setSelectedPet, filtered, setFiltered, setIsEditable } =
    usePetContext();
  const { pet, management } = props;

  const deletePet = (petID) => {
    axios
      .delete(`/delete-pet/${petID}`)
      .then((response) => {
        if ("error" in response.data) {
          alert(response.data.error);
        } else {
          let updated = [...filtered];
          updated = updated.filter((pet) => pet["_id"]["$oid"] !== petID);
          setFiltered(updated);
          alert(response.data.success);
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className={classes.PetCard}>
      <div className={classes.PetImage}>
        <img src={pet.Type === "Gato" ? CatImg : DogImg} />
      </div>
      <ul>
        <li><strong>Nome</strong>: {pet.Name}</li>
        <li><strong>Raça</strong>: {pet.Breed}</li>
        <li><strong>Idade</strong>: {pet.Age}</li>
        <li><strong>Peso</strong>: {pet.Weight}kg</li>
        <li><strong>Cidade</strong>: {pet.City}</li>
        {management ? null : <li><strong>Contato</strong>: {pet.Contact}</li>}
      </ul>
      <div>
        {management ? (
          <>
            <Link to="/edition">
              <button
                className={[classes.Button, classes.EditButton].join(" ")}
                onClick={() => {
                  setIsEditable(true);
                  setSelectedPet(pet);
                }}
              >
                Editar
              </button>
            </Link>
            <button
              className={[classes.Button, classes.DeleteButton].join(" ")}
              onClick={() => deletePet(pet["_id"]["$oid"])}
            >
              Deletar
            </button>
          </>
        ) : (
          <button className={[classes.Button, classes.AdoptButton].join(" ")}>
            Adotar
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
