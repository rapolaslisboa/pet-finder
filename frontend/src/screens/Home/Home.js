import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import samples from "../../helpers/PetsData";
import Card from "../../components/Card/Card";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";

const Home = () => {
  const { userCity } = useAuthContext();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let routeURL =
      userCity === null
        ? "http://127.0.0.1:5000/api/list-pets"
        : `http://127.0.0.1:5000/api/list-pets/${userCity}`;
    axios
      .get(routeURL)
      .then((response) => {
        if ("error" in response.data) {
          alert(response.data.error);
        } else {
          setFiltered(response.data);
        }
      })
      .catch((error) => alert(error));
  }, [userCity]);

  return (
    <div className={classes.Home}>
      <font>Anuncie e encontre pets para adoção!</font>
      {userCity !== null ? (
        <font>
          Pets para adoção na cidade de <strong>{userCity}</strong>
        </font>
      ) : null}
      <div className={classes.PetList}>
        {filtered.length > 0 ? (
          filtered.map(
            (pet, index) => !pet.Adopted && <Card key={index} pet={pet} />
          )
        ) : userCity === null ? (
          <p>Ainda não há pets anunciados...</p>
        ) : (
          <p>
            Ainda não há pets anunciados para a cidade de{" "}
            <strong>{userCity}</strong>...
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
