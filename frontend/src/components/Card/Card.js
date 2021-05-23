import React from "react";
import CatImg from "../../assets/images/cat.jpg";
import DogImg from "../../assets/images/dog.jpg";
import { useModalContext } from "../../contexts/ModalContext";
import axios from "axios";
import classes from "./Card.module.css";

const Card = (props) => {
  const { openModal, handleModalContent } = useModalContext();
  const { pet, management, filtered, setFiltered } = props;

  const deletePet = (petID) => {
    axios
      .delete(`http://127.0.0.1:5000/api/delete-pet/${petID}`)
      .then((response) => {
        if ("error" in response.data) {
          alert(response.data.error);
        } else {
          let updated = [...filtered]
          updated = updated.filter(pet => pet["_id"][["$oid"]] !== petID);
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
            <button
              className={[classes.Button, classes.EditButton].join(" ")}
              onClick={() => {
                openModal();
                handleModalContent("PetFormulary");
              }}
            >
              Editar
            </button>
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
