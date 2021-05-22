import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import samples from "../../helpers/PetsData";
import CatImg from "../../assets/images/cat.jpg";
import DogImg from "../../assets/images/dog.jpg";

const Home = () => {
  return (
    <div className={classes.Home}>
      <font>Anuncie e encontre pets para adoção!</font>
      <div className={classes.PetList}>
        {samples.map(
          (s) =>
            !s.Adopted && (
              <div className={classes.PetCard}>
                <div className={classes.PetImage}>
                  <img src={s.Type === "Gato" ? CatImg : DogImg} />
                </div>
                <ul>
                  <li><strong>Nome</strong>: {s.Name}</li>
                  {/* <li><strong>Tipo</strong>: {s.Type}</li> */}
                  <li><strong>Raça</strong>: {s.Breed}</li>
                  <li><strong>Idade</strong>: {s.Age}</li>
                  <li><strong>Peso</strong>: {s.Weight}kg</li>
                  <li><strong>Cidade</strong>: {s.City}</li>
                  <li><strong>Contato</strong>: {s["User ID"]}</li>
                </ul>
                <div>
                  <button className={classes.AdoptButton} onClick={() => console.log(s["User ID"])}>Adotar</button>     
                </div>          
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Home;
