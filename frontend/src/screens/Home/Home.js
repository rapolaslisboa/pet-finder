import axios from "axios";
import React, { useEffect } from "react";
import Card from "../../components/Card/Card";
import { useAuthContext } from "../../contexts/AuthContext";
import { usePetContext } from "../../contexts/PetContext";
import classes from "./Home.module.css";

const Home = () => {
  const { userCity } = useAuthContext();
  const { filtered, setFiltered, updateCards } = usePetContext();

  useEffect(() => {
    let routeURL =
      userCity === null
        ? "http://127.0.0.1:5000/api/list-pets"
        : `http://127.0.0.1:5000/api/list-pets/${userCity}`;
    axios
      .get(routeURL)
      .then((response) => {
        if ("error" in response.data) {
          setFiltered([]);
        } else {
          setFiltered(response.data);
        }
      })
      .catch((error) => alert(error));
  }, [updateCards, userCity]);

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
