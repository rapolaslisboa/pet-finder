import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import samples from "../../helpers/PetsData";
import Card from "../../components/Card/Card";
import { useAuthContext } from "../../contexts/AuthContext";

const Home = () => {
  const { userCity } = useAuthContext();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (userCity === null) {
      setFiltered(samples);
      // setFiltered([]);
    } else {
      setFiltered(samples.filter((element) => element.City === userCity));
      // setFiltered([]);
    }
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
            (element) =>
              !element.Adopted && (
                <Card key={element["Pet ID"]} element={element} />
              )
          )
        ) : userCity === null ? (
          <p>Ainda não há pets anunciados...</p>
        ) : (
          <p>
            Ainda não há pets anunciados para a cidade de{" "}
            <strong>{userCity}</strong>...
          </p>
        )}
        {/* {filtered.map(
          (element) =>
            !element.Adopted && (
              <Card key={element["Pet ID"]} element={element} />
            )
        )} */}
      </div>
    </div>
  );
};

export default Home;
